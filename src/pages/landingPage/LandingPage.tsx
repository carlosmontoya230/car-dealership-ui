import HeroSection from "../../components/layouts/landingLayout/heroSection/HeroSection";
import Footer from "../../components/molecules/landingMolecules/footer/Footer";
import Header from "../../components/molecules/landingMolecules/header/Header";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <>
      <div className="landing-container">
        <Header />
        <main className="main-content">
          <HeroSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
