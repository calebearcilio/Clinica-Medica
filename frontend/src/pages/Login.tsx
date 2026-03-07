import {
  faArrowRightToBracket,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { validateSchema } from "../schemas/validations";
import PopupMessage from "../components/messages/PopupMessage";
import { useNavigate } from "react-router-dom";
import secretarioService from "../services/secretarioService";
import { loginSchema } from "../schemas/loginSchema";

const Login = () => {
  const navegate = useNavigate();
  const [formData, setFormData] = useState<{ email: string; senha: string; keepLogin: boolean }>({
    email: "",
    senha: "",
    keepLogin: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<{
    severity: "error" | "success" | "info" | "warning" | undefined;
    msg: string;
    open: boolean;
  }>({
    severity: undefined,
    msg: "",
    open: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((form) => ({ ...form, [name]: value }));
    setErrors((message) => ({ ...message, [name]: "" }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validate = validateSchema(formData, loginSchema);
    if (!validate.isValid) {
      setErrors(validate.errors);
      setMsg({
        severity: "error",
        msg: "Erro ao realizar login. Verifique suas credenciais.",
        open: true
      });
      return;
    }

    setIsLoading(true);
    setMsg({
      severity: undefined,
      msg: "",
      open: false,
    });
    try {
      const secretario = await secretarioService.login(
        formData.email,
        formData.senha,
        formData.keepLogin
      );
      setMsg({
        severity: "success",
        msg: `Login realizado com sucesso! Bem-vindo, ${secretario.nome}.`,
        open: true
      });
      setTimeout(() => {
        navegate("/dashboard", { replace: true });
      }, 1000);
    } catch (error: any) {
      if (error.message) {
        const message = error.message.split(".")[0];
        const key = error.message.split(" ")[0].toLowerCase();

        setMsg({
          severity: "error",
          msg: error.message,
          open: true
        });
        setErrors({ [key]: message });
        return;
      }
      setMsg({
        severity: "error",
        msg: "Erro interno. Tente novamente mais tarde.",
        open: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PopupMessage
        open={msg.open}
        onClose={() => {
          setMsg((msg) => ({ ...msg, open: false }));
        }}
        message={msg.msg}
        severity={msg.severity}
      />

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
              disabled={isLoading}
              fullWidth
              required
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FontAwesomeIcon icon={faLock} />
            <TextField
              label="Senha"
              name="senha"
              type="password"
              margin="normal"
              onChange={handleInputChange}
              value={formData.senha}
              error={!!errors.senha}
              helperText={errors.senha}
              disabled={isLoading}
              fullWidth
              required
            ></TextField>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.keepLogin}
                onChange={(event) => {
                  setFormData((form) => ({...form, keepLogin: event.target.checked}));
                }}
              />
            }
            label="Manter logado?"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
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
