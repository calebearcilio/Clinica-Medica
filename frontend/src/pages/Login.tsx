import {
  faArrowRightToBracket,
  faLeaf,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [manter, setManter] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Formulário enviado");
    console.log("Email:", email)
    console.log("Senha:", senha)
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSenha(event.target.value);
  }
  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
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
              fullWidth
              margin="normal"
              onChange={handleEmailChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FontAwesomeIcon icon={faLock} />
            <TextField
              label="Senha"
              name="senha"
              type="password"
              fullWidth
              margin="normal"
              onChange={handlePasswordChange}
            ></TextField>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={manter}
                onChange={(event) => {
                  setManter(event.target.checked);
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
          >
            Entrar
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
            <Link href="#cadastrar" underline="hover">
              Criar conta
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
