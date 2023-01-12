import { createContext, useState } from 'react';

const initialState = {
  text: '',
  type: '',
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('');
  const [open, setOpen] = useState(true);

  const setAlert = (text, type) => {
    setText(text);
    setType(type);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
        open,
        setOpen,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
