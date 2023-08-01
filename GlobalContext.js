import { createContext, useState } from "react";

const GlobalContext = createContext();

export const ContextProvider = ({ children }) => {
  const [loginRes, setLoginRes] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <GlobalContext.Provider
      value={{ loginRes, setLoginRes, loading, setLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
