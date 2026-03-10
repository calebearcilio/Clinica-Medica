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
import type { Consulta } from "../../types/consulta";
import { useEffect, useState } from "react";
import pacienteService from "../../services/pacienteService";
import medicoService from "../../services/medicoService";
import type { Paciente } from "../../types/paciente";
import type { Medico } from "../../types/medico";

type ConsultaFormData = Omit<Consulta, "id" | "paciente" | "medico">;

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ConsultaFormData) => Promise<void>;
  consulta?: Consulta | null;
};

type Options = {
  pacientes: Paciente[];
  medicos: Medico[];
};

const empityForm: ConsultaFormData = {
  dataHora: "",
  descricao: "",
  medicoId: 0,
  pacienteId: 0,
};

const ConsultaFormModal = ({ open, onClose, onSubmit, consulta }: Props) => {
  const [form, setForm] = useState<ConsultaFormData>(empityForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>();

  useEffect(() => {
    loadData();
    if (consulta) {
      setForm({
        dataHora: consulta.dataHora,
        descricao: consulta.descricao,
        medicoId: consulta.medicoId,
        pacienteId: consulta.pacienteId,
      });
    } else {
      setForm(empityForm);
    }
  }, [consulta, open]);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(form);
    console.log(form);
    setLoading(false);
    onClose();
  };

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
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="Descrição"
            name="descricao"
            value={form.descricao}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            select
            label="Médico"
            name="medicoId"
            defaultValue={consulta ? form.medicoId : null}
            onChange={handleInputChange}
            fullWidth
          >
            {options?.medicos.map((medico) => (
              <MenuItem key={medico.id} value={medico.id}>
                {medico.nome} <br /> {medico.especialidade}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Paciente"
            name="pacienteId"
            defaultValue={consulta ? form.pacienteId : null}
            onChange={handleInputChange}
            fullWidth
          >
            {options?.pacientes.map((paciente) => (
              <MenuItem key={paciente.id} value={paciente.id}>
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
