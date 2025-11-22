import React, { useState } from "react";
import "./ContactSection.css";

export interface TeamMember {
  name: string;
  role: string;
  email: string;
  image: string;
}

interface ContactSectionProps {
  title: string;
  subtitle?: string;
  team: TeamMember[];
  buttonText?: string;
  onButtonClick?: () => void;
}

const ContactSection = ({
  title,
  subtitle,
  team,
  buttonText,
  onButtonClick,
}: ContactSectionProps) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = async (email: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {}
  };

  return (
    <section className="contact-section landing-content-width">
      <div className="contact-header">
        <h2 className="contact-title">{title}</h2>
        {subtitle && <p className="contact-subtitle">{subtitle}</p>}
        {buttonText && (
          <button className="contact-button" onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
      <div className="contact-cards">
        {team.map((person, idx) => (
          <div className="contact-card" key={idx}>
            <img src={person.image} alt={person.name} className="contact-img" />
            <div className="contact-info">
              <h3 className="contact-name">{person.name}</h3>
              <p className="contact-role">{person.role}</p>
              <span
                className="contact-email"
                tabIndex={0}
                role="button"
                onClick={() => handleCopy(person.email, idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCopy(person.email, idx);
                }}
                title="Haz clic para copiar"
              >
                {person.email}
                {copiedIdx === idx && (
                  <span className="copied-tooltip">Copiado</span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;
