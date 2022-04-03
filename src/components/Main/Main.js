import React, { useState, useEffect } from "react";
import classes from './Main.module.css'
import Card from './Card/Card'
import api from '../../utils/api';

function Main() {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getGames()
      .then((cardsArray) => {
        setCards([...cardsArray.results]);
      })
      .catch((err) => {
          console.log(`Невозможно отобразить карточки с сервера ${err}`);
      })
  }, [])

  return (
    <div className={classes.container}>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
  );
}

export default Main;
