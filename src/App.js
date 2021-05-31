import React from "react";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Header />
    </AuthProvider>
  );
}

export default App;
