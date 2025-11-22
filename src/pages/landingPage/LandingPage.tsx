import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../../components/layouts/landingLayout/heroSection/HeroSection";
import Footer from "../../components/molecules/landingMolecules/footer/Footer";
import Header from "../../components/molecules/landingMolecules/header/Header";
import "./LandingPage.css";
import FeatureSection from "../../components/layouts/landingLayout/featureSection/FeatureSection";
import type { TeamMember } from "../../components/layouts/landingLayout/contact/ContactSection";
import ContactSection from "../../components/layouts/landingLayout/contact/ContactSection";

export default function LandingPage() {
  const [active, setActive] = useState(0);

  const team: TeamMember[] = [
    {
      name: "Carlos Yepes",
      role: "Desarrolladora Frontend",
      email: "carlosmontoya289609@correo.itm.edu.co",
      image: "../../assets/ceoImI.jpg",
    },
    {
      name: "Carlos Yepes",
      role: "Desarrollador Backend",
      email: "carlosmontoya289609@correo.itm.edu.co",
      image: "../../assets/ceoImI.jpg",
    },
    {
      name: "Carlos Yepes",
      role: "UX/UI Designer",
      email: "carlosmontoya289609@correo.itm.edu.co",
      image: "../../assets/ceoImI.jpg",
    },
  ];

  const sections = [
    <HeroSection
      key="inicio"
      title="Gestión Vehicular Inteligente"
      subtitle="Optimiza tu flota, simplifica alquileres, potencia tu negocio."
      image="/src/assets/Logo corporativo2.png"
      buttonText="SOLICITAR DEMO"
    />,
    <FeatureSection key="caracteristicas" />,
    ,
    <ContactSection
      key="contacto"
      title="Nuestro Equipo"
      subtitle="Conoce a las personas detrás del proyecto"
      team={team}
      buttonText="Contáctanos"
      onButtonClick={() => alert("¡Gracias por tu interés!")}
    />,
  ];

  return (
    <div className="landing-container">
      <Header onNavChange={setActive} activeIndex={active} />
      <main className="main-content">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ width: "100%" }}
            >
              {sections[active]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
