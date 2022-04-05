import React from "react";
import { useParams } from "react-router-dom";
import classes from './Game.module.css'
import { Link } from 'react-router-dom';

function Game({ cards }) {

  const { id } = useParams();
  const game = cards.find(card => card.id == id);

  return (
    <>
      <div className={classes.container}>
        <p className={classes.name}>{game.name}</p>
        <img className={classes.image} src={game.background_image} alt={game.name} />
      </div>
      <Link to={`/`} className={classes.link}>Go back</Link>
    </>
  );
}

export default Game;
