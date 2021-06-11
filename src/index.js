import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { AuthProvider } from "./context/AuthContext"
import GlobalThemeProvider from "./context/ThemeContext"

ReactDOM.render(
  <React.StrictMode>
    <GlobalThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GlobalThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
