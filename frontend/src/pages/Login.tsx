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
import { validateLogin } from "../schemas/validations";
import PopupMessage from "../components/PopupMessage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navegate = useNavigate();
  const [formData, setFormData] = useState<{ email: string; senha: string }>({
    email: "",
    senha: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msgErro, setMsgErro] = useState<string>("");
  const [msgSuccess, setMsgSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [checkbox, setCheckbox] = useState<boolean>(false); // caixa de seleção "Manter logado"

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((form) => ({ ...form, [name]: value }));
    setErrors((message) => ({ ...message, [name]: "" }));
    setMsgErro("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMsgErro("");
    setMsgSuccess("");

    setTimeout(() => {
      const validate = validateLogin(formData);
      if (!validate.isValid) {
        setErrors(validate.errors);
        setMsgErro("Erro ao realizar login. Verifique suas credenciais.");
      } else {
        setMsgSuccess("Login realizado com sucesso!");
        setTimeout(() => {
          navegate("/dashboard");
        }, 1000);
      }
      setIsLoading(false);
    }, 1000);
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
        open={!!msgSuccess}
        onClose={() => {
          setMsgSuccess("");
        }}
        message={msgSuccess}
        severity="success"
      />

      <PopupMessage
        open={!!msgErro}
        onClose={() => {
          setMsgErro("");
        }}
        message={msgErro}
        severity="error"
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
                checked={checkbox}
                onChange={(event) => {
                  setCheckbox(event.target.checked);
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
