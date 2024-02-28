import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
const Card = (props) => {
  let { path, title } = props;
  if (path === "" || path === undefined || path === null) {
    path = "/";
  }

  return (
    <div className="card-inline">
      <Link className="card__container" to={path}>
        <h1> {title}</h1>{" "}
      </Link>
    </div>
  );
};

export default Card;
