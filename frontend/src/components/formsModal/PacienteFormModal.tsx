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
import { validateSchema } from "../../schemas/validations";
import {
  createPacienteSchema,
  updatePacienteSchema,
} from "../../schemas/pacienteSchema";
import { usePopup } from "../messages/PopupProvider";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePacienteData) => Promise<void>;
  paciente?: Paciente | null;
};

// objeto com informações vazias
const empityForm: CreatePacienteData = {
  nome: "",
  cpf: "",
  telefone: "",
  email: "",
  dataNascimento: "",
};

const PacienteFormModal = ({ open, onClose, onSubmit, paciente }: Props) => {
  // informações capturadas no formulário
  const [form, setForm] = useState<CreatePacienteData>(empityForm);
  // controle de carregamento
  const [loading, setLoading] = useState<boolean>(false);
  // mostrar possíveis erros nos campos
  const [errors, setErrors] = useState<Record<string, string>>({});
  // contexto global da mensagem popup
  const { showPopup } = usePopup();

  useEffect(() => {
    setErrors({});
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
    setErrors((errors) => ({ ...errors, [name]: "" }));
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
    // validando os campos com zod
    const validate = validateSchema(
      form,
      paciente ? updatePacienteSchema : createPacienteSchema,
    );

    if (!validate.isValid) {
      setErrors(validate.errors);
      showPopup("Erro ao realizar login. Verifique suas credenciais.", "error");
      return;
    }

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
            error={!!errors.nome}
            helperText={errors.nome}
            disabled={loading}
            fullWidth
          />
          <TextField
            label="CPF"
            name="cpf"
            placeholder="000.000.000-00"
            value={form.cpf}
            onChange={handleInputChange}
            error={!!errors.cpf}
            helperText={errors.cpf}
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
            type="email"
            value={form.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={loading}
            fullWidth
          />
          <TextField
            label="Data de nascimento"
            name="dataNascimento"
            type="date"
            value={form.dataNascimento}
            onChange={handleInputChange}
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.dataNascimento}
            helperText={errors.dataNascimento}
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

export default PacienteFormModal;
