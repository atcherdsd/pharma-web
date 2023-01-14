import { createContext, useState } from 'react';

const initialState = {
  text: '',
  type: '',
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
  showErrorAlert: () => {},
  showSuccessAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('');
  const [open, setOpen] = useState(true);

  const setAlert = (text, type) => {
    setText(text);
    setType(type);
    setOpen(true);
  };

  const showErrorAlert = (text) => setAlert(text, 'error');
  const showSuccessAlert = (text) => setAlert(text, 'success');

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
        showErrorAlert,
        showSuccessAlert,
        open,
        setOpen,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
