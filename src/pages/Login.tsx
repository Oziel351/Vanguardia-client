import { Button, TextField } from "@mui/material";
import Logo_Vanguardia from "../assets/images/Logo_Vanguardia.png";
import { useState } from "react";
import { useAuthActions } from "../state/actions/useAuthActions";

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login } = useAuthActions();

  const handleLogin = () => {
    login(formData);
  };

  return (
    <div className="flex flex-col justify-center h-screen relative">
      <div className="absolute  right-0 bg-[#110E0E] w-130 h-150 rounded-lg flex items-center justify-center m-2 ">
        <img
          className="bounceTop"
          src={Logo_Vanguardia}
          alt="Logo Vanguardia"
        />
      </div>
      <div className="flex flex-col items-start justify-center h-full p-18">
        <div className="flex flex-col  justify-center space-y-4">
          <h1 className="text-4xl font-bold text-[#110E0E]">Iniciar Sesión</h1>
          <p>¡Bienvenido a Vanguardia Digital Seguridad Privada!</p>
          <hr className="w-96 border-[#D9D9D9] my-4" />
          <TextField
            style={{ marginBottom: 10 }}
            variant="outlined"
            placeholder="Usuario"
            className="w-96 "
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            style={{ marginBottom: 10 }}
            variant="outlined"
            placeholder="Contraseña"
            className="w-96"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button
            variant="contained"
            className="w-96"
            onClick={handleLogin}
            disabled={!formData.email || !formData.password}
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};
