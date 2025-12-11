import { Alert, Box, Button, Paper, Typography } from "@mui/material";

type Props = {
  alertMessage: string;
  message: string;
  functionReload: () => void;
  severity?: "success" | "error" | "warning" | "info";
  buttonColor?: "success" | "inherit" | "primary" | "secondary" | "error" | "warning" | "info";
};

const StaticMessage = ({
  alertMessage,
  message,
  functionReload,
  severity = "info",
  buttonColor = "info"
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: "480px",
          width: "100%",
        }}
      >
        <Alert severity={severity} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {message}
        </Typography>

        <Button variant="contained" color={buttonColor} fullWidth onClick={functionReload}>
          Tentar novamente
        </Button>
      </Paper>
    </Box>
  );
};

export default StaticMessage;
