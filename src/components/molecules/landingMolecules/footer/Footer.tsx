import "./Footers.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div
        className="landing-content-width"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} SIGAV. Todos los derechos
          reservados.
        </p>
        <div className="social-links">
          <a href="#twitter" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#instagram" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
