import React from "react";
import classes from './Select.module.css'

function Select({ options, defaultValue, value, onChange }) {
  return (
    <div className={classes.container}>
      <select 
        className={classes.select}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option className={classes.option} value="" disabled>{defaultValue}</option>
        {options.map(option =>
          <option key={option.name} className={classes.option} value={option.name}>
            {option.name}
          </option>
        )}
      </select>
    </div>
  );
}

export default Select;
