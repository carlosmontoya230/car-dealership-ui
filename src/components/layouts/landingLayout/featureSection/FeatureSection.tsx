import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  wrap,
} from "framer-motion";
import { useEffect, useRef } from "react";
import CardFeature from "../../../atoms/landingsAtoms/cardFeature/CardFeatures";
import "./FeatureSection.css";

const FeatureSection = () => {
  const cards = [
    {
      image:
        "https://img.freepik.com/vector-gratis/ilustracion-vector-concepto-abstracto-sistema-transporte-inteligente-gestion-trafico-estacionamiento-tecnologia-ciudad-inteligente-seguridad-vial-informacion-sobre-viajes-metafora-abstracta-transporte-publico_335657-1768.jpg",
      title: "Gestión de Flota",
      description: "Administra todos tus vehículos desde un solo lugar.",
    },
    {
      image:
        "https://img.freepik.com/vector-gratis/dibujado-mano-recopilacion-datos-concepto-negocio_23-2149170409.jpg",
      title: "Reportes Inteligentes",
      description: "Obtén reportes automáticos y toma mejores decisiones.",
    },
    {
      image:
        "https://img.freepik.com/vector-gratis/ilustracion-relaciones-publicas-planas-organicas_52683-59265.jpg",
      title: "Alertas y Notificaciones",
      description: "Recibe alertas en tiempo real sobre tu flota.",
    },
    {
      image:
        "https://img.freepik.com/vector-gratis/fondo-gente-haciendo-puzzle-juntos_23-2148093612.jpg",
      title: "Extra",
      description:
        "Accede a módulos adicionales para personalizar la gestión de tu concesionario y potenciar tus operaciones.",
    },
    {
      image:
        "https://img.freepik.com/vector-gratis/usuario-sincronizacion-computadora-portatil-telefono-inteligente-sincronizacion-dispositivos-sincronizacion-dispositivos-concepto-operacion-sobre-fondo-blanco-ilustracion-aislada-violeta-vibrante-brillante_335657-310.jpg",
      title: "Actualizaciones Recurrentes",
      description:
        "Disfruta de mejoras continuas y nuevas funcionalidades que mantienen tu concesionario siempre a la vanguardia.",
    },
  ];

  const SPEED = 18;
  const itemWidth = 300;

  const x = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 42, stiffness: 95 });

  const baseX = useTransform(smoothX, (value) =>
    wrap(-itemWidth * cards.length, 0, value)
  );

  const isAnimating = useRef(false);

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    x.set(x.get() + itemWidth);
    setTimeout(() => (isAnimating.current = false), 350);
  };

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    x.set(x.get() - itemWidth);
    setTimeout(() => (isAnimating.current = false), 350);
  };

  useEffect(() => {
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const delta = (now - last) / 1000;
      last = now;
      x.set(x.get() - delta * SPEED);
      requestAnimationFrame(tick);
    };
    tick();
  }, []);

  return (
    <section className="feature-section landing-content-width">
      <h2 className="feature-title">Características Claves</h2>
      <div className="carousel-wrapper" style={{ position: "relative" }}>
        <button
          className="carousel-arrow carousel-arrow--left"
          onClick={handlePrev}
          aria-label="Anterior"
        >
          &#8592;
        </button>
        <motion.div className="feature-carousel" style={{ x: baseX }}>
          {[...cards, ...cards, ...cards].map((item, i) => {
            const distance = useTransform(baseX, (val) => {
              const cardCenter = i * itemWidth;
              const diff = Math.abs((val * -1 - cardCenter) / itemWidth);
              return diff;
            });

            const scale = useTransform(
              distance,
              [0, 1.4, 2.8, 4],
              [1, 0.92, 0.78, 0.6]
            );

            const opacity = useTransform(
              distance,
              [0, 1.4, 2.8, 4],
              [1, 0.88, 0.55, 0.15]
            );

            const blur = useTransform(
              distance,
              [0, 1.4, 3.2],
              ["0px", "0.6px", "12px"]
            );

            const filter = useTransform(blur, (v) => `blur(${v})`);

            return (
              <motion.div
                key={i}
                className="feature-card"
                style={{
                  width: itemWidth,
                  scale,
                  opacity,
                  filter,
                }}
              >
                <CardFeature {...item} borderColor="orange" />
              </motion.div>
            );
          })}
        </motion.div>
        <button
          className="carousel-arrow carousel-arrow--right"
          onClick={handleNext}
          aria-label="Siguiente"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default FeatureSection;
