import React from "react";
import classes from './Main.module.css'
import Card from './Card/Card'


function Main({ cards, onCardClick }) {

  return (
    <div className={classes.container}>
      {cards.map((card) => {
        return <Card
          image={card.background_image}
          name={card.name}
          rating={card.rating}
          released={card.released}
          card={card}
          key={card.id}
          id={card.id}
          onCardClick={onCardClick}
        />
      })}
    </div>
  );
}

export default Main;
