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
import type {
  CreateMedicoData,
  Medico,
  UpdateMedicoData,
} from "../../types/medico";
import { validateSchema } from "../../schemas/validations";
import {
  createMedicoSchema,
  updateMedicoSchema,
} from "../../schemas/medicoSchema";
import { maskTelefone } from "../../utils/inputMaskUtils";

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
  // informações capturadas no formulário
  const [form, setForm] = useState<CreateMedicoData | UpdateMedicoData>(
    empityForm,
  );
  // controle de carregamento
  const [loading, setLoading] = useState<boolean>(false);
  // mostrar possíveis erros nos campos
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setErrors({});

    // trazendo dados do paciente, caso seja selecionado um
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
    setErrors((errors) => ({ ...errors, [name]: "" }));

    // formatando telefone a cada mudança
    if (name === "telefone") {
      const valueMasked = maskTelefone(value);
      setForm({ ...form, [name]: valueMasked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    // validando os campos com zod
    const validate = validateSchema(
      form,
      medico ? updateMedicoSchema : createMedicoSchema,
    );

    if (!validate.isValid) {
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
            required
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
            required
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
            required
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
            required
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
            required
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
