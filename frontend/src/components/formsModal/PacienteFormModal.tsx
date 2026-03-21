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
import { maskCPF, maskTelefone } from "../../utils/inputMaskUtils";

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

    // trazendo dados do paciente, caso seja selecionado um
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

  // função de captura de entrada
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrors((errors) => ({ ...errors, [name]: "" }));

    // formatando CPF a cada mudança
    if (name === "cpf") {
      const valueMasked = maskCPF(value);
      setForm({ ...form, [name]: valueMasked });

      // formatando telefone a cada mudança
    } else if (name === "telefone") {
      const valueMasked = maskTelefone(value);
      setForm({ ...form, [name]: valueMasked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // função de validação e envio de dados para o servidor
  const handleSubmit = async () => {
    // validando os campos com zod
    const validate = validateSchema(
      form,
      paciente ? updatePacienteSchema : createPacienteSchema,
    );
    if (!validate.isValid) {
      setErrors(validate.errors);
      showPopup("Credências inválidas.", "error");
      return;
    }

    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  // Conteúdo principal
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
            required
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
            required
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

export default PacienteFormModal;
