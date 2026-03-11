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
import type { CreateMedicoData, Medico, UpdateMedicoData } from "../../types/medico";
import { validateSchema } from "../../schemas/validations";
import { createMedicoSchema, updateMedicoSchema } from "../../schemas/medicoSchema";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateMedicoData | UpdateMedicoData) => Promise<void>;
  medico?: Medico | null;
};

const empityForm: UpdateMedicoData = {
  nome: "",
  especialidade: "",
  crm: "",
  telefone: "",
  email: "",
};

const MedicoFormModal = ({ open, onClose, onSubmit, medico }: Props) => {
  const [form, setForm] = useState<CreateMedicoData | UpdateMedicoData>(empityForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({})

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

    const validate = validateSchema(form, (medico ? updateMedicoSchema : createMedicoSchema))

    if(!validate.isValid){
      setErrors(validate.errors);
      return;
    }


    setLoading(true);
    try {
      await onSubmit(form);
    } catch (error: any) {
      // tratamento de erros
    } finally {
      setLoading(false);
      onClose();
    }
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
            error={!!errors.nome}
            helperText={errors.nome}
            disabled={loading}
            fullWidth
          />
          <TextField
            label="Especialidade"
            name="especialidade"
            value={form.especialidade}
            onChange={handleInputChange}
            error={!!errors.especialidade}
            helperText={errors.especialidade}
            disabled={loading}
            fullWidth
          />
          <TextField
            label="CRM"
            name="crm"
            placeholder="CRMx-000"
            value={form.crm}
            onChange={handleInputChange}
            error={!!errors.crm}
            helperText={errors.crm}
            disabled={loading}
            fullWidth
          />
          <TextField
            label="Telefone"
            name="telefone"
            placeholder="+55 (00) 90000-0000"
            value={form.telefone}
            onChange={handleInputChange}
            error={!!errors.telefone}
            helperText={errors.telefone}
            disabled={loading}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={loading}
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
