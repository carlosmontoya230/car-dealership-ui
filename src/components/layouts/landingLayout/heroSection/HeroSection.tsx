import "./HeroSection.css";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const HeroSection = ({
  title,
  subtitle,
  image,
  buttonText,
  onButtonClick,
}: HeroSectionProps) => {
  return (
    <section className="hero-section landing-content-width">
      <div className="hero-logo-display">
        <img src={image} alt="Hero" className="main-sigav-logo" />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        {buttonText && (
          <button className="hero-button" onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
