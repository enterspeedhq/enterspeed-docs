import React from "react";

const CardListItem = ({ title, children, link }) => {
  return (
    <div className="es-card-list-item">
      <a href={link} title="{title}">
        <div className="es-card-list-item__title">
          <h4>{title}</h4>
        </div>
        <div className="es-card-list-item__content">
          {children}
        </div>
      </a>
    </div>
  );
};

const CardListContainer = ({ children }) => {
  return <div className="es-card-container">{children}</div>;
};

export { CardListItem, CardListContainer };
