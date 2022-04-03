import React from "react";
import classes from './Header.module.css'

function Header() {
  return (
    <header className={classes.header}>
      <p className={classes.logo}>GAMES</p>
    </header>
  );
}

export default Header;
