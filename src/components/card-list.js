import React from "react";

const CardList = ({ title, content, link }) => {
  return (
    <div class="es-card-list">
      <div class="es-card-list__heading">
        <h4>{title}</h4>
      </div>
      <div class="es-card-list__content">
        <p>{content}</p>
        <p><a href={link}>{title}</a></p>
      </div>
    </div>
  );
};

const CardListContainer = ({ children }) => {
  return <div className="es-card-list__container">{children}</div>;
};

export { CardList, CardListContainer };
