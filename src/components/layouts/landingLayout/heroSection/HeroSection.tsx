import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section id="inicio" className="hero-section landing-content-width">
      <div className="hero-logo-display">
        <img
          src="/src/assets/Logo corporativo2.png"
          alt="Main SIGAV Logo"
          className="main-sigav-logo"
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Gestión Vehicular Inteligente</h1>
        <p className="hero-subtitle">
          Optimiza tu flota, simplifica alquileres, potencia tu negocio.
        </p>
        <button className="hero-button">SOLICITAR DEMO</button>
      </div>
    </section>
  );
};

export default HeroSection;
