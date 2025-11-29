import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import PhoneIcon from "@mui/icons-material/Phone";
import * as Form from "@radix-ui/react-form";
import * as Toggle from "@radix-ui/react-toggle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../../api/httpClient";
import ButtonLanding from "../../components/atoms/buttons/custom/CustomButtonClasic";
import "./AuthGlobal.css";

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
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Regex internacional
  const phoneRegex = /^\+\d{1,3}\d{7,14}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handlePasswordBlur() {
    setMainIcon("🐵");
  }

  function handlePasswordInputFocus() {
    setMainIcon(showPassword ? "🙊" : "🙈");
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    if (!emailRegex.test(value)) {
      setEmailError("Correo inválido");
    } else {
      setEmailError("");
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPhone(value);
    if (!phoneRegex.test(value)) {
      setPhoneError("Formato internacional requerido: +573001234567");
    } else {
      setPhoneError("");
    }
  }

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!emailRegex.test(email)) {
      setEmailError("Correo inválido");
      setLoading(false);
      return;
    }
    if (!phoneRegex.test(phone)) {
      setPhoneError("Formato internacional requerido: +573001234567");
      setLoading(false);
      return;
    }
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
              src={"../../assets/LogoCarDealer.png"}
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
              onFocus={handlePasswordBlur}
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
              onChange={handleEmailChange}
              disabled={loading}
              onFocus={handlePasswordBlur}
              style={{
                borderColor: emailError ? "#d32f2f" : undefined,
              }}
            />
          </Form.Control>
          <div
            style={{
              color: "#d32f2f",
              fontSize: "0.95rem",
              marginTop: "0.3rem",
              minHeight: "1.2em",
              transition: "opacity 0.2s",
              opacity: emailError ? 1 : 0,
            }}
          >
            {emailError}
          </div>
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
        <Form.Field name="phone" className="form-field phone-field">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control asChild>
            <input
              type="tel"
              name="phone"
              required
              value={phone}
              onChange={handlePhoneChange}
              disabled={loading}
              onFocus={handlePasswordBlur}
              placeholder="+573001234567"
              className="input-phone"
              style={{
                borderColor: phoneError ? "#d32f2f" : undefined,
              }}
            />
          </Form.Control>
          <span className="phone-icon">
            <PhoneIcon style={{ fontSize: 20 }} />
          </span>
          <div
            style={{
              color: "#d32f2f",
              fontSize: "0.95rem",
              marginTop: "0.3rem",
              minHeight: "1.2em",
              transition: "opacity 0.2s",
              opacity: phoneError ? 1 : 0,
            }}
          >
            {phoneError}
          </div>
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
              onFocus={handlePasswordBlur}
            />
          </Form.Control>
        </Form.Field>
        <div className="form-error">{error}</div>
        <Form.Submit asChild>
          <ButtonLanding
            className="btn login-btn"
            type="submit"
            disabled={
              loading ||
              !email ||
              !contrasena ||
              !name ||
              !phone ||
              !address ||
              !!emailError ||
              !!phoneError
            }
          >
            {loading ? <span className="spinner"></span> : "Registrarse"}
          </ButtonLanding>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
