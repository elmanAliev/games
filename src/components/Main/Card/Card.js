import React from "react";
import classes from './Card.module.css'

function Card({ image, name, rating, released }) {
  return (
    <div className={classes.card}>
      <img className={classes.poster} src={image} alt={name} />
      <div className={classes.description}>
        <h2 className={classes.name}>{name}</h2>
        <div className={classes.info}>
          <p className={classes.date}>{released}</p>
          <p className={classes.rating}>{rating}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
