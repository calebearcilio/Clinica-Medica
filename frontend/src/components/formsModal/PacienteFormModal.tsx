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
import { useEffect, useState } from "react";
import type { CreatePacienteData, Paciente } from "../../types/paciente";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePacienteData) => Promise<void>;
  paciente?: Paciente | null;
};

const empityForm: CreatePacienteData = {
  nome: "",
  cpf: "",
  telefone: "",
  email: "",
  dataNascimento: "",
};

const PacienteFormModal = ({ open, onClose, onSubmit, paciente }: Props) => {
  const [form, setForm] = useState<CreatePacienteData>(empityForm);
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

    if (name === "cpf") {
      event.currentTarget.maxLength = 14;
      const valueMasked = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
      setForm({ ...form, [name]: valueMasked });
    } else if (name === "telefone") {
      event.currentTarget.maxLength = 19;
      const valueMasked = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/g, "+$1 ($2")
        .replace(/(\d{2})(\d)/, "$1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
      setForm({ ...form, [name]: valueMasked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {paciente ? "Editar paciente" : "Cadastrar novo paciente"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} m={1}>
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
            placeholder="000.000.000-00"
            value={form.cpf}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Telefone"
            name="telefone"
            placeholder="+55 (00) 90000-0000"
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
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Stack>
      </DialogContent>

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
    </Dialog>
  );
};

export default PacienteFormModal;
