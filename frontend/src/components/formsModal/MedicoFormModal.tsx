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
import type { Medico } from "../../types/medico";
import { useEffect, useState } from "react";

type MedicoFormData = {
  nome: string;
  especialidade: string;
  crm: string;
  telefone?: string;
  email: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: MedicoFormData) => Promise<void>;
  medico?: Medico | null;
};

const empityForm: MedicoFormData = {
  nome: "",
  especialidade: "",
  crm: "",
  telefone: "",
  email: "",
};

const MedicoFormModal = ({ open, onClose, onSubmit, medico }: Props) => {
  const [form, setForm] = useState<MedicoFormData>(empityForm);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (medico) {
      setForm({
        nome: medico.nome,
        especialidade: medico.especialidade,
        crm: medico.crm,
        telefone: medico.telefone,
        email: medico.email,
      });
    } else {
      setForm(empityForm);
    }
  }, [medico, open]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "telefone") {
      event.currentTarget.maxLength = 19;
      const valueMasked = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/g, "+$1 ($2")
        .replace(/(\d{2})(\d)/, "$1) $2")
        .replace(/(\d{5})(\d{4})/, "$1-$2");
      setForm({ ...form, [name]: valueMasked });
    } else {
      setForm({ ...form, [name]: value });
    }
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
        {medico ? "Editar médico" : "Cadastrar novo médico"}
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
            label="Especialidade"
            name="especialidade"
            value={form.especialidade}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="CRM"
            name="crm"
            placeholder="CRMx-000"
            value={form.crm}
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
            value={form.email}
            onChange={handleInputChange}
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

export default MedicoFormModal;
