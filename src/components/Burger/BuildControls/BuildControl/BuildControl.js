import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
      <div className={classes.BuildControl}>
          <div className={classes.Label}>{props.label}</div>
          <button
              onClick={props.ingredientRemove}
              disabled={props.disabled}
              className={classes.Less}>Less</button>
          <span>{props.ingredientsCount}</span>
          <button
              onClick={props.ingredientAdded}
              className={classes.More}>More</button>
      </div>
);

export default buildControl;
