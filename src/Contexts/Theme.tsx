import { createContext, useState } from "react";

export const DarkModeContext = createContext<{ DarkMode: boolean; setDarkMode: React.Dispatch<React.SetStateAction<boolean>>; }>({
  DarkMode: true,
  setDarkMode: () => {}
});

export const DarkModeContextProvider = ({ children }: any) => {

  const [DarkMode, setDarkMode] = useState<boolean>(true)
  return (
    <DarkModeContext.Provider value={{ DarkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}