import React from "react";
import "./CardFeatures.css";

interface CardFeatureProps {
  image: string;
  title: string;
  description: string;
  borderColor: "orange" | "red";
}

const CardFeature: React.FC<CardFeatureProps> = ({
  image,
  title,
  description,
  borderColor,
}) => (
  <div className={`feature-section-card feature-section-card--${borderColor}`}>
    <div className="feature-section-card-img-container">
      <img src={image} alt={title} className="feature-section-card-img" />
    </div>
    <h3 className="feature-section-card-title">{title}</h3>
    <p className="feature-section-card-desc">{description}</p>
  </div>
);

export default CardFeature;
