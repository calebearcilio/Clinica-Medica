import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { CreateConsultaData, Consulta } from "../../types/consulta";
import pacienteService from "../../services/pacienteService";
import medicoService from "../../services/medicoService";
import type { Paciente } from "../../types/paciente";
import type { Medico } from "../../types/medico";
import { usePopup } from "../messages/PopupProvider";
import { validateSchema } from "../../schemas/validations";
import {
  createConsultaSchema,
  updateConsultaSchema,
} from "../../schemas/consultaSchema";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { maskCPF } from "../../utils/inputMaskUtils";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateConsultaData) => Promise<void>;
  consulta?: Consulta | null;
};

type Options = {
  pacientes: Paciente[];
  medicos: Medico[];
};

const empityForm: CreateConsultaData = {
  dataHora: "",
  descricao: "",
  medicoId: 0,
  pacienteId: 0,
};

const ConsultaFormModal = ({ open, onClose, onSubmit, consulta }: Props) => {
  // informações capturadas no formulário
  const [form, setForm] = useState<CreateConsultaData>(empityForm);
  // controle de carregamento
  const [loading, setLoading] = useState<boolean>(false);
  // mostrar possíveis erros nos campos
  const [errors, setErrors] = useState<Record<string, string>>({});
  // contexto global da mensagem popup
  const { showPopup } = usePopup();
  // opções de escolha de paciente e médico
  const [options, setOptions] = useState<Options>();

  // carregando as opções
  useEffect(() => {
    loadOptions();
  }, []);

  // trazendo dados das consultas, caso seja selecionado um
  useEffect(() => {
    setErrors({});

    if (consulta) {
      setForm({
        dataHora: consulta.dataHora,
        descricao: consulta.descricao,
        medicoId: consulta.medicoId,
        pacienteId: consulta.pacienteId,
      });
    } else if (options && !consulta) {
      setForm({
        ...empityForm,
        medicoId: options.medicos[options.medicos.length - 1].id || 0,
        pacienteId: options.pacientes[options.pacientes.length - 1].id || 0,
      });
    }
  }, [consulta, open, options]);

  // carregando dados de pacientes e médicos para as opções
  const loadOptions = async (): Promise<void> => {
    const [pacienteDB, medicoDB] = await Promise.all([
      pacienteService.get(),
      medicoService.get(),
    ]);
    setOptions({
      pacientes: pacienteDB,
      medicos: medicoDB,
    });
  };

  // função de captura de entrada
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrors((errors) => ({ ...errors, [name]: "" }));
    setForm({ ...form, [name]: value });
  };

  // função de validação e envio de dados para o servidor
  const handleSubmit = async () => {
    // validando os campos com zod
    const validate = validateSchema(
      form,
      consulta ? createConsultaSchema : updateConsultaSchema,
    );
    if (!validate.isValid) {
      setErrors(validate.errors);
      showPopup("Credênciais inválidas", "error");
      return;
    }

    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  // Conteúdo principal
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {consulta ? "Editar Consulta" : "Nova Consulta"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} m={1}>
          <DateTimePicker
            label="Data e hora"
            name="dataHora"
            value={form.dataHora ? dayjs(form.dataHora) : null}
            disabled={loading}
            minDateTime={dayjs()}
            minutesStep={15}
            onChange={(newValue: Dayjs | null) => {
              setErrors((errors) => ({ ...errors, dataHora: "" }));

              setForm((form) => ({
                ...form,
                dataHora:
                  newValue && newValue.isValid() ? newValue.toISOString() : "",
              }));
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                error: !!errors.dataHora,
                helperText: errors.dataHora,
              },
            }}
          />
          <TextField
            label="Descrição"
            name="descricao"
            value={form.descricao}
            onChange={handleInputChange}
            error={!!errors.descricao}
            helperText={errors.descricao}
            disabled={loading}
            fullWidth
          />

          {/* Opções de médicos */}
          <Autocomplete
            options={options?.medicos || []}
            getOptionLabel={(option) =>
              `${option.nome} - ${option.especialidade}`
            }
            value={options?.medicos.find((m) => m.id === form.medicoId)}
            onChange={(_, newValue) => {
              setErrors((errors) => ({ ...errors, medicoId: "" }));

              setForm((form) => ({ ...form, medicoId: newValue?.id || 0 }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Médico"
                error={!!errors.medicoId}
                helperText={errors.medicoId}
                required
              />
            )}
          />
          {/* Opções de pacientes */}
          <Autocomplete
            options={options?.pacientes || []}
            getOptionLabel={(option) => `${option.nome} - ${maskCPF(option.cpf)}`}
            value={options?.pacientes.find((p) => p.id === form.pacienteId)}
            onChange={(_, newValue) => {
              setErrors((errors) => ({ ...errors, pacienteId: "" }));

              setForm((form) => ({ ...form, pacienteId: newValue?.id || 0 }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Paciente"
                error={!!errors.pacienteId}
                helperText={errors.pacienteId}
                required
              />
            )}
          />
        </Stack>

        <DialogActions>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                Salvando...
              </Box>
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultaFormModal;
