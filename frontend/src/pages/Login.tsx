import {
  faArrowRightToBracket,
  faLock,
  faUnlock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import secretarioService from "../services/secretarioService";
import { loginSchema } from "../schemas/loginSchema";
import { validateSchema } from "../schemas/validations";
import { usePopup } from "../components/messages/PopupProvider";
import type { LoginSecretarioData } from "../types/secretario";

// objeto com informações vazias
const empityForm = {
  email: "",
  senha: "",
  keepLogin: false,
};

const Login = () => {
  // alterar navegação após login
  const navegate = useNavigate();
  // mostrar possíveis erros nos campos
  const [errors, setErrors] = useState<Record<string, string>>({});
  // controle de carregamento
  const [loading, setLoading] = useState<boolean>(false);
  // mostrar/esconder senha
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // informações capturadas no formulário
  const [formData, setFormData] = useState<LoginSecretarioData>(empityForm);
  // contexto global da mensagem popup
  const { showPopup } = usePopup();

  // função ativada a cada alteração do usuário
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((form) => ({ ...form, [name]: value }));
    setErrors((message) => ({ ...message, [name]: "" }));
  };

  // função acionada ao enviar o formulário
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // impede de recarregar a página

    // validando os campos com zod
    const validate = validateSchema(formData, loginSchema);
    if (!validate.isValid) {
      setErrors(validate.errors);
      showPopup("Erro ao realizar login. Verifique suas credenciais.", "error");
      return;
    }

    setLoading(true);
    try {
      // enviando formulário para o servidor
      const secretario = await secretarioService.login(formData);
      showPopup(
        `Login realizado com sucesso! Bem-vindo, ${secretario.nome}.`,
        "success",
      );

      // espera de 1 segundo para redirecionar
      setTimeout(() => {
        navegate("/dashboard", { replace: true });
      }, 1000);
    } catch (error: any) {
      // tratamento de erros
      if (error.message) {
        // resposta do servidor
        const message = error.message.split(".")[0];
        const key = error.message.split(" ")[0].toLowerCase();
        showPopup(error.message, "error");
        setErrors({ [key]: message });
        return;
      }
      // erro interno
      showPopup("Erro interno. Tente novamente mais tarde.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 2, width: "80vh" }} elevation={7}>
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <FontAwesomeIcon
            icon={faArrowRightToBracket}
            size="2xl"
            style={{ color: "#74C0FC" }}
          />
          <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
            Login
          </Typography>
        </Box>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FontAwesomeIcon icon={faUser} />
            <TextField
              label="Email"
              name="email"
              type="email"
              margin="normal"
              onChange={handleInputChange}
              value={formData.email}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
              fullWidth
              required
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FontAwesomeIcon icon={showPassword ? faUnlock : faLock} />
            <TextField
              label="Senha"
              name="senha"
              type={showPassword ? "text" : "password"}
              margin="normal"
              onChange={handleInputChange}
              value={formData.senha}
              error={!!errors.senha}
              helperText={errors.senha}
              disabled={loading}
              fullWidth
              required
              // Ícone de visibilidade da senha
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.keepLogin}
                onChange={(event) => {
                  setFormData((form) => ({
                    ...form,
                    keepLogin: event.target.checked,
                  }));
                }}
              />
            }
            disabled={loading}
            label="Manter logado?"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                Carregando...
              </Box>
            ) : (
              "Entrar"
            )}
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href="#nova-senha" underline="hover">
              Esqueci minha senha
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
