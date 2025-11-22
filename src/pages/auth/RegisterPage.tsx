import * as Form from "@radix-ui/react-form";
import * as Toggle from "@radix-ui/react-toggle";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../../api/httpClient";
import "./AuthGlobal.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ButtonLanding from "../../components/atoms/buttons/custom/CustomButtonClasic";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);
  const [contrasena, setPassword] = useState("");
  const [mainIcon, setMainIcon] = useState("🐵");

  function handlePasswordBlur() {
    setMainIcon("🐵");
  }

  function handlePasswordInputFocus() {
    setMainIcon(showPassword ? "🙊" : "🙈");
  }

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await httpClient.post("/users/create-user", {
        name,
        email,
        password: contrasena,
        phone,
        address,
        roles: [6],
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 2500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar usuario");
      setEmail("");
      setPassword("");
      setName("");
      setPhone("");
      setAddress("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      {success && (
        <div className="register-success">¡Usuario creado exitosamente!</div>
      )}
      <Form.Root className="login-form" onSubmit={handleSubmit}>
        <div
          className="register-icon"
          title="Volver a login"
          onClick={() => navigate("/login")}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
          }}
        >
          <LoginIcon style={{ fontSize: 32, color: "#321152" }} />
        </div>
        <div className="login-icon">
          <div
            className="company-logo-auth"
            title="Ir a la página principal"
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "1.5rem",
              left: "1.5rem",
              zIndex: 10,
            }}
          >
            <img
              src={"/src/assets/LogoCarDealer.png"}
              alt="Logo compañía"
              style={{ width: 48, height: 48, borderRadius: "50%" }}
            />
          </div>
          <span
            style={{
              fontSize: 100,
              color: "#321152",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            role="img"
            aria-label="Usuario"
          >
            {mainIcon}
          </span>
        </div>

        <h2>Registrarse</h2>
        <Form.Field name="name" className="form-field">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="email" className="form-field">
          <Form.Label>Correo</Form.Label>
          <Form.Control asChild>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              onFocus={handlePasswordBlur}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="password" className="form-field">
          <Form.Label>Contraseña</Form.Label>
          <div className="password-toggle-field">
            <Form.Control asChild>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength={6}
                value={contrasena}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                onFocus={handlePasswordInputFocus}
              />
            </Form.Control>
            <Toggle.Root
              className="toggle-password"
              pressed={showPassword}
              onPressedChange={(pressed) => {
                setShowPassword(pressed);
                setMainIcon(pressed ? "🙊" : "🙈");
              }}
              aria-label="Mostrar contraseña"
              type="button"
              disabled={loading}
            >
              {showPassword ? (
                <VisibilityOff style={{ color: "#321152" }} />
              ) : (
                <Visibility style={{ color: "#321152" }} />
              )}
            </Toggle.Root>
          </div>
        </Form.Field>
        <Form.Field name="phone" className="form-field">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control asChild>
            <input
              type="tel"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="address" className="form-field">
          <Form.Label>Dirección</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              name="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
            />
          </Form.Control>
        </Form.Field>
        <div className="form-error">{error}</div>
        <Form.Submit asChild>
          <ButtonLanding
            className="btn login-btn"
            type="submit"
            disabled={
              loading || !email || !contrasena || !name || !phone || !address
            }
          >
            {loading ? <span className="spinner"></span> : "Registrarse"}
          </ButtonLanding>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
