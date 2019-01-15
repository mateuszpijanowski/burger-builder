import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(ctrl => {
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                ingredientAdded={() => props.ingredientAdded(ctrl.type)}
                ingredientRemove={() => props.ingredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>;
        })}
    </div>
);

export default buildControls;

