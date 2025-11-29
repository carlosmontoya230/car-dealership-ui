import { useState, useRef, useEffect } from "react";
import httpClient from "../../api/httpClient";
import ButtonLanding from "../../components/atoms/buttons/custom/CustomButtonClasic";
import "./AuthGlobal.css";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [timer, setTimer] = useState(120);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleRequestCode(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");
    if (!emailRegex.test(email)) {
      setEmailError("Correo inválido");
      return;
    }
    setLoading(true);
    try {
      await httpClient.post(
        `/auth-sso/request-password-recovery?email=${encodeURIComponent(email)}`
      );
      setStep(2);
      setTimer(120);
      setCode("");
      setCodeError("");
    } catch (err: any) {
      setEmailError(err.response?.data?.message || "Error solicitando código");
    } finally {
      setLoading(false);
    }
  }

  async function handleValidateCode(e: React.FormEvent) {
    e.preventDefault();
    setCodeError("");
    if (code.length !== 6) {
      setCodeError("El código debe tener 6 dígitos");
      return;
    }
    setLoading(true);
    try {
      const res = await httpClient.post(
        `/auth-sso/validate-code?email=${encodeURIComponent(
          email
        )}&code=${code}`
      );
      if (res.data.valid) {
        setStep(3);
        setTimer(0);
      } else {
        setCodeError("Código inválido");
      }
    } catch (err: any) {
      setCodeError(err.response?.data?.message || "Código inválido o expirado");
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      await httpClient.post(
        `/auth-sso/change-password?email=${encodeURIComponent(
          email
        )}&newPassword=${password}`
      );
      setSuccess("Contraseña actualizada correctamente.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setPasswordError(
        err.response?.data?.message || "Error actualizando contraseña"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (step === 2 && timer > 0) {
      timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    }
    if (step === 2 && timer === 0) {
      httpClient.post(
        `/auth-sso/clear-verification-code-by-email?email=${encodeURIComponent(
          email
        )}`
      );
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer, step, email]);

  async function handleResendCode() {
    setLoading(true);
    setCode("");
    setCodeError("");
    try {
      await httpClient.post(
        `/auth-sso/request-password-recovery?email=${encodeURIComponent(email)}`
      );
      setTimer(120);
    } catch (err: any) {
      setCodeError(err.response?.data?.message || "Error reenviando código");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" style={{ gap: "2rem" }}>
        <h2>Recuperar contraseña</h2>
        {step === 1 && (
          <>
            <FormField label="Correo electrónico">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                disabled={loading}
                style={{
                  borderColor: emailError ? "#d32f2f" : undefined,
                }}
              />
            </FormField>
            <div className="form-error">{emailError}</div>
            <ButtonLanding
              className="btn login-btn"
              type="submit"
              onClick={handleRequestCode}
              disabled={loading || !email}
            >
              {loading ? <span className="spinner"></span> : "Enviar código"}
            </ButtonLanding>
          </>
        )}
        {step === 2 && (
          <>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ fontWeight: 500 }}>
                Ingresa el código de 6 dígitos enviado a tu teléfono (SMS).
              </span>
              <div
                style={{
                  fontSize: "1.2rem",
                  color: "#4f5ba6",
                  marginTop: "0.5rem",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
              >
                {String(Math.floor(timer / 60)).padStart(2, "0")}:
                {String(timer % 60).padStart(2, "0")}
              </div>
            </div>
            <FormField label="Código SMS">
              <input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                required
                autoFocus
                disabled={loading || timer === 0}
                style={{
                  fontSize: "1.5rem",
                  textAlign: "center",
                  letterSpacing: "10px",
                  borderColor: codeError ? "#d32f2f" : undefined,
                }}
              />
            </FormField>
            <div className="form-error">{codeError}</div>
            <ButtonLanding
              className="btn login-btn"
              type="submit"
              onClick={handleValidateCode}
              disabled={loading || code.length !== 6 || timer === 0}
            >
              {loading ? <span className="spinner"></span> : "Validar código"}
            </ButtonLanding>
            <ButtonLanding
              className="btn login-btn"
              type="button"
              style={{
                background: "#fff",
                color: "#4f5ba6",
                border: "1.5px solid #4f5ba6",
                marginTop: "1rem",
              }}
              onClick={handleResendCode}
              disabled={loading || timer > 0}
            >
              Intentar de nuevo
            </ButtonLanding>
          </>
        )}
        {step === 3 && (
          <>
            <FormField label="Nueva contraseña">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoFocus
                disabled={loading}
              />
            </FormField>
            <FormField label="Confirmar contraseña">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
              />
            </FormField>
            <div className="form-error">{passwordError}</div>
            <ButtonLanding
              className="btn login-btn"
              type="submit"
              onClick={handleChangePassword}
              disabled={
                loading ||
                !password ||
                !confirmPassword ||
                password !== confirmPassword
              }
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                "Cambiar contraseña"
              )}
            </ButtonLanding>
            {success && <div className="register-success">{success}</div>}
          </>
        )}
      </form>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="form-field">
      <label style={{ fontWeight: 600, color: "#23326b" }}>{label}</label>
      {children}
    </div>
  );
}
