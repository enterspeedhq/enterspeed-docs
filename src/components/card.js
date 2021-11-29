import React from "react";

const Card = ({ title, link, image, imageBg }) => {
  return (
    <div class="es-card">
      <a href={link}>
        <div className={"es-card__image " + imageBg}>
          <img src={image} />
        </div>
        <div class="es-card__title">{title}</div>
      </a>
    </div>
  );
};

const CardContainer = ({ children }) => {
  return <div class="es-card-container">{children}</div>;
};

export { Card, CardContainer };
