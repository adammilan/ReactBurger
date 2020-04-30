import React from 'react';
import classes from './SingleControl.css';
const singleControl = (props)=>(
    <div className={classes.SingleControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}
         onClick={props.remove} 
        disabled = {props.disabled}>Less</button>
        <button className={classes.More} 
        onClick={props.add}>More</button>
    </div>
);



export default singleControl;