import React from 'react';

import classes from './Order.css';
import Button from '../UI/Button/Button';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientsOutput = ingredients.map(key => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={key.name}>{key.name} ({key.amount})</span>;
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
            <Button btnType="Success" clicked={props.details}>View details</Button>
            <Button btnType="Danger" clicked={props.remove}>Remove</Button>
        </div>
    );
};

export default order;
