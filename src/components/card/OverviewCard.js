import React from "react";

const OverviewCard = (pros) => {
  const { title, data } = pros;
  return (
    <div className="overview-card__block">
      <h1 className="card__title">{title}</h1>
      <div className="card__content">{data}</div>
    </div>
  );
};

export default OverviewCard;
