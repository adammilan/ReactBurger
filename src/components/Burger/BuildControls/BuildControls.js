import React from 'react';

import classes from './BuildControls.css';
import SingleControl from './SingleControl/SingleControl';


const controls = [
    { label: 'Salad', type:'salad'},
    { label: 'Bacon', type:'bacon'},
    { label: 'Cheese', type:'cheese'},
    { label: 'Meat', type:'meat'},
    
];

const buildControls = (props) => (

    <div className={classes.BuildConrols}>
        <p>Current Price :<strong> {props.price}</strong></p>
        {controls.map(ctrl => (
            <SingleControl 
            key={ctrl.label}
            label={ctrl.label} 
            add = { () =>props.ingredientAdded(ctrl.type)}
            remove = {()=> props.ingredientRemove(ctrl.type)}
            disabled = {props.disabled[ctrl.type]}
            />
        ))} 
        <button className={classes.OrderButton}
        disabled = {!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
    </div>
);


export default buildControls;