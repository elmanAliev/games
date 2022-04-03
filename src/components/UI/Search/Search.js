import React from "react";
import classes from './Search.module.css'

function Search({ value, onChange }) {
  return (
    <div className={classes.container}>
      <input value={value} onChange={onChange} type="text" placeholder="Поиск"/>
    </div>
  );
}

export default Search;
