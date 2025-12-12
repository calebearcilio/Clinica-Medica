import { Alert, Slide, Snackbar } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  severity?: "success" | "error" | "warning" | "info";
  message: ReactNode;
};

function SlideRight(props: any) {
  return <Slide {...props} direction="left" />;
}

const PopupMessage = ({ open, onClose, severity = "info", message }: Props) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      slots={{ transition: SlideRight }}
      onClose={onClose}
    >
      <Alert
        severity={severity}
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "10px",
          fontWeight: "bold",
        }}
        onClose={onClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default PopupMessage;
