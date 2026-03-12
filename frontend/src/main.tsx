import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.tsx'
import { AppContextProvider } from './context/AppContext.tsx';

export const authService = "http://localhost:5001"
export const priamryColor = "#E23774"

createRoot(document.getElementById('root')!).render(
  
  
  <StrictMode>
    <GoogleOAuthProvider clientId="503411379483-pt8bf6h6vsacrj5kvi5fev831jpapu36.apps.googleusercontent.com">
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </GoogleOAuthProvider>;
  </StrictMode>,
)
