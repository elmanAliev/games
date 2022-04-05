import React from "react";
import classes from './Search.module.css'

function Search({ value, onChange }) {
  return (
    
      <input className={classes.input} value={value} onChange={onChange} type="text" placeholder="Поиск"/>
    
  );
}

export default Search;
