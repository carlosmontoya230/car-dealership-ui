import { useEffect, useState } from "react";
import "./HomePage.css";

const carouselItems = [
  { icon: "📊", text: "Visualiza tus indicadores en tiempo real" },
  { icon: "⚡", text: "Actualización rápida y sencilla" },
  { icon: "🔒", text: "Tus datos siempre seguros" },
  { icon: "📈", text: "Analiza tendencias fácilmente" },
  { icon: "🤝", text: "Colabora con tu equipo" },
];

export default function Homepage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>SIGAV</h1>
        <div className="carousel-container">
          {carouselItems.map((item, idx) => (
            <div
              key={idx}
              className={`carousel-item${active === idx ? " active" : ""}`}
            >
              <span className="carousel-icon">{item.icon}</span>
              <span className="carousel-text">{item.text}</span>
            </div>
          ))}
          <div className="carousel-dots">
            {carouselItems.map((_, idx) => (
              <span
                key={idx}
                className={`carousel-dot${active === idx ? " active" : ""}`}
                onClick={() => setActive(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
