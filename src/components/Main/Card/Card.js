import React from "react";
import image from "../../../images/112121.jpg";
import classes from './Card.module.css'

function Card() {
  return (
    <div className={classes.card}>
      <img className={classes.poster} src={image} alt="" />
      <div className={classes.description}>
        <h2 className={classes.name}>имя</h2>
        <div className={classes.info}>
          <p className={classes.date}>дата</p>
          <p className={classes.rating}>рейтинг</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
