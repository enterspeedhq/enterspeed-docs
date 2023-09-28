import React from "react";

const Card = ({
  title,
  link,
  image,
  imageBg,
  children,
  isExternal,
  imagePadding,
  splash,
}) => {
  return (
    <div
      className={`es-card ${
        image ? "es-card--image-layout" : "es-card--simple-layout"
      }`}
    >
      {splash &&
        <div className="es-card__splash">{splash}</div>
      }
      <a target={isExternal && "_blank"} href={link}>
        {image && (
          <div className={"es-card__image " + imageBg}>
            <img
              src={image}
              style={{
                padding: imagePadding,
              }}
            />
          </div>
        )}
        <div className="es-card__content">
          <div className="es-card__title">{title}</div>
          {children && <div className="es-card__body">{children}</div>}
        </div>
      </a>
    </div>
  );
};

const CardContainer = ({ children, size }) => {
  return (
    <div
      className="es-card-container"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${cardSizes[size]}, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};

const cardSizes = {
  small: "150px",
  medium: "200px",
  large: "250px",
};

export { Card, CardContainer };
