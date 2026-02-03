import {
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
import type { Paciente } from "../../types/paciente";
import { useEffect, useState } from "react";

type PacienteFormData = {
  nome: string;
  cpf: string;
  telefone: string | undefined;
  email: string;
  dataNascimento: string;
};

const empityForm: PacienteFormData = {
  nome: "",
  cpf: "",
  telefone: "",
  email: "",
  dataNascimento: "",
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PacienteFormData) => Promise<void>;
  paciente?: Paciente | null;
};

const PacienteFormModal = ({ open, onClose, onSubmit, paciente }: Props) => {
  const [form, setForm] = useState<PacienteFormData>(empityForm);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (paciente) {
      setForm({
        nome: paciente.nome,
        cpf: paciente.cpf,
        telefone: paciente.telefone,
        email: paciente.email,
        dataNascimento: paciente.dataNascimento.slice(0, 10),
      });
    } else {
      setForm(empityForm);
    }
  }, [paciente, open]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {paciente ? "Editar paciente" : "Adicionar paciente"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mb={1}>
          <TextField
            label="Nome"
            name="nome"
            value={form.nome}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="CPF"
            name="cpf"
            value={form.cpf}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Telefone"
            name="telefone"
            value={form.telefone}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Data de nascimento"
            name="dataNascimento"
            type="date"
            value={form.dataNascimento}
            onChange={handleInputChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose} fullWidth>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
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
    </Dialog>
  );
};

export default PacienteFormModal;
