import { createContext, useContext, useState, type ReactNode } from "react";
import PopupMessage from "./PopupMessage";

// severidade da mensgaem
type PopupSeverity = "success" | "error" | "warning" | "info";

// interface do método padrão para mostrar a mensagem
interface PopupContextData {
  showPopup: (message: ReactNode, severity?: PopupSeverity) => void;
}

// contexto para mostrar a mensagem em qualquer componente
const PopupContext = createContext<PopupContextData>({} as PopupContextData);

// props do componente
type Props = {
  children: ReactNode;
};

// componente principal
const PopupProvider = ({ children }: Props) => {
  // state com atributos para serem usados no componente PopupMessage
  const [state, setState] = useState({
    open: false,
    message: "" as ReactNode,
    severity: "info" as PopupSeverity,
  });

  // função para usar nos componentes e mostrar as mensagens
  const showPopup = (message: ReactNode, severity: PopupSeverity = "info") => {
    setState({
      open: true,
      message: message,
      severity: severity,
    });
  };

  // função usada ao esconder a mensagem
  const handleClose = () => setState((prev) => ({ ...prev, open: false }));

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}

      <PopupMessage
        open={state.open}
        message={state.message}
        severity={state.severity}
        onClose={handleClose}
      />
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
export default PopupProvider;
