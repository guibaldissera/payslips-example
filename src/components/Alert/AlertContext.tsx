import { createContext, useContext, useState, ReactNode } from "react";
import { Alert, AlertVariant } from "./Alert";

interface ShowAlertParams {
  variant: AlertVariant;
  title?: string;
  message?: string;
}

interface AlertContextType {
  showAlert: (params: ShowAlertParams) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertState, setAlertState] = useState<{
    visible: boolean;
    variant: AlertVariant;
    title?: string;
    message?: string;
  }>({
    visible: false,
    variant: "info",
  });

  const showAlert = ({ variant, title, message }: ShowAlertParams) => {
    setAlertState({
      visible: true,
      variant,
      title,
      message,
    });
  };

  const handleDismiss = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Alert
        variant={alertState.variant}
        title={alertState.title}
        message={alertState.message}
        visible={alertState.visible}
        onDismiss={handleDismiss}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
