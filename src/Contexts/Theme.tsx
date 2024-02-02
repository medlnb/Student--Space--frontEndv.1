import { ReactNode, createContext, useState } from "react";

export const DarkModeContext = createContext<{ DarkMode: boolean; setDarkMode: React.Dispatch<React.SetStateAction<boolean>>; }>({
  DarkMode: !!localStorage.getItem("darkmode"),
  setDarkMode: () => {}
});

export const DarkModeContextProvider = ({ children }: { children: ReactNode }) => {
  const [DarkMode, setDarkMode] = useState<boolean>(!!localStorage.getItem("darkmode"))
  if (DarkMode)
    localStorage.setItem("darkmode", "True")
  else
    localStorage.removeItem("darkmode")
  return (
    <DarkModeContext.Provider value={{ DarkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}