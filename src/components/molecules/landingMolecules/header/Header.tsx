import { Link } from "react-router-dom";
import "./Header.css";
import { BiLogInCircle } from "react-icons/bi";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Características", href: "#caracteristicas" },
  { label: "Precios", href: "#precios" },
  { label: "Contacto", href: "#contacto" },
];

interface HeaderProps {
  onNavChange: (index: number) => void;
  activeIndex: number;
}

const Header = ({ onNavChange, activeIndex }: HeaderProps) => {
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
          {navItems.map((item, idx) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={activeIndex === idx ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  onNavChange(idx);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="login-icon">
            <Link to="/login" aria-label="Login" title="Iniciar sesión">
              <BiLogInCircle />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
