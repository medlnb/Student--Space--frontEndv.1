import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthContextProvider } from './Contexts/UserContext.tsx'
import './index.css'
import { DarkModeContextProvider } from './Contexts/Theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </AuthContextProvider>
)
