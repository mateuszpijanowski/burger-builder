import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

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
                    key={ ctrl.label }
                    label={ ctrl.label }
                    ingredientsCount={ ctrl.count }
                    ingredientRemove={() => props.ingredientRemove(ctrl.type)}
                    ingredientAdded={() => props.ingredientAdded(ctrl.type)}
                    disabled={ props.disabled[ctrl.type] }/>;
            })}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{ props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER' }
            </button>
        </div>
    );
};

export default buildControls;
