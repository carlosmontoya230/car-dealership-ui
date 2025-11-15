import "./Header.css";
import { useState } from "react";
import { BiLogInCircle } from "react-icons/bi";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Características", href: "#caracteristicas" },
  { label: "Precios", href: "#precios" },
  { label: "Contacto", href: "#contacto" },
];

const Header = () => {
  const [active, setActive] = useState("#inicio");

  return (
    <header className="header-container">
      <div className="logo-section">
        <img
          src="/src/assets/LogoCarDealerNotBatckground.png"
          alt="SIGAV Logo"
          className="header-logo"
        />
        <span className="logo-text">SIGAV</span>
      </div>
      <nav className="nav-menu">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={active === item.href ? "active" : ""}
                onClick={() => setActive(item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="login-icon">
            <a href="#login" aria-label="Login">
              <BiLogInCircle />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
