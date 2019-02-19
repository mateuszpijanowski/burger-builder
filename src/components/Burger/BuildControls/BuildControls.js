import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const buildControls = (props) => {
    const ingredientsCount = Object.keys(props.ingredients)
        .map(igKey => props.ingredients[igKey] );

    const controls = [
        { label: 'Salad', type: 'salad', count: ingredientsCount[3] },
        { label: 'Bacon', type: 'bacon', count: ingredientsCount[0] },
        { label: 'Cheese', type: 'cheese', count: ingredientsCount[1] },
        { label: 'Meat', type: 'meat', count: ingredientsCount[2] },
    ];

    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}$</strong></p>

            {controls.map(ctrl => {
                return <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    ingredientsCount={ctrl.count}
                    ingredientAdded={() => props.ingredientAdded(ctrl.type)}
                    ingredientRemove={() => props.ingredientRemove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}/>;
            })}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>ORDER NOW
            </button>
        </div>
    );
};

export default buildControls;

