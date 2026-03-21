import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
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

  useEffect(() => {
    setErrors({});
    loadData();

    // trazendo dados das consultas, caso seja selecionado um
    if (consulta) {
      setForm({
        dataHora: consulta.dataHora,
        descricao: consulta.descricao,
        medicoId: consulta.medicoId,
        pacienteId: consulta.pacienteId,
      });
    } else {
      setForm({
        ...empityForm,
        medicoId: options?.medicos[0].id || 0,
        pacienteId: options?.pacientes[0].id || 0,
      });
    }
  }, [consulta, open]);

  // carregando dados de pacientes e médicos para as opções
  const loadData = async (): Promise<void> => {
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
          <TextField
            label="Data e Hora"
            name="dataHora"
            type="date"
            value={form.dataHora.slice(0, 10)}
            onChange={handleInputChange}
            error={!!errors.dataHora}
            helperText={errors.dataHora}
            disabled={loading}
            fullWidth
            required
            slotProps={{ inputLabel: { shrink: true } }}
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
          <TextField
            select
            label="Médico"
            name="medicoId"
            defaultValue={form.medicoId}
            onChange={handleInputChange}
            error={!!errors.medicoId}
            helperText={errors.medicoId}
            disabled={loading}
            fullWidth
            required
          >
            {/* Opções de médicos */}
            {options?.medicos
              ? options?.medicos.map((medico) => (
                  <MenuItem key={`medico-${medico.id}`} value={medico.id}>
                    {medico.nome} <br /> {medico.especialidade}
                  </MenuItem>
                ))
              : "Nenhum médico cadastrado"}
          </TextField>
          <TextField
            select
            label="Paciente"
            name="pacienteId"
            defaultValue={form.pacienteId}
            onChange={handleInputChange}
            error={!!errors.pacienteId}
            helperText={errors.pacienteId}
            disabled={loading}
            fullWidth
            required
          >
            {/* Opções de pacientes */}
            {options?.pacientes.map((paciente) => (
              <MenuItem key={`paciente-${paciente.id}`} value={paciente.id}>
                {paciente.nome} <br /> {paciente.cpf}
              </MenuItem>
            ))}
          </TextField>
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
