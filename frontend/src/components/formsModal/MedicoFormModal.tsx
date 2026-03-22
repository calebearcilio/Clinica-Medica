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
import type { CreateMedicoData, Medico } from "../../types/medico";
import { validateSchema } from "../../schemas/validations";
import {
  createMedicoSchema,
  updateMedicoSchema,
} from "../../schemas/medicoSchema";
import { maskCrm, maskTelefone } from "../../utils/inputMaskUtils";
import { usePopup } from "../messages/PopupProvider";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateMedicoData) => Promise<void>;
  medico?: Medico | null;
};

const empityForm: CreateMedicoData = {
  nome: "",
  especialidade: "",
  crm: "",
  telefone: "",
  email: "",
};

const MedicoFormModal = ({ open, onClose, onSubmit, medico }: Props) => {
  // informações capturadas no formulário
  const [form, setForm] = useState<CreateMedicoData>(empityForm);
  // controle de carregamento
  const [loading, setLoading] = useState<boolean>(false);
  // mostrar possíveis erros nos campos
  const [errors, setErrors] = useState<Record<string, string>>({});
  // contexto global da mensagem popup
  const { showPopup } = usePopup();

  useEffect(() => {
    setErrors({});

    // trazendo dados do paciente, caso seja selecionado um
    if (medico) {
      setForm({
        nome: medico.nome,
        especialidade: medico.especialidade,
        crm: maskCrm(medico.crm),
        telefone: maskTelefone(medico.telefone),
        email: medico.email,
      });
    } else {
      setForm(empityForm);
    }
  }, [medico, open]);

  // função de captura de entrada
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrors((errors) => ({ ...errors, [name]: "" }));

    // formatando telefone a cada mudança
    if (name === "telefone") {
      const valueMasked = maskTelefone(value);
      setForm({ ...form, [name]: valueMasked });
    } else if (name === "crm") {
      const valueMasked = maskCrm(value);
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
      medico ? updateMedicoSchema : createMedicoSchema,
    );

    if (!validate.isValid) {
      setErrors(validate.errors);
      showPopup("Credênciais inválidas.", "error");
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
            placeholder="UF-0000"
            value={form.crm}
            onChange={handleInputChange}
            error={!!errors.crm}
            helperText={errors.crm}
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
