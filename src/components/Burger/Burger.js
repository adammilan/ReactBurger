import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    var tranformedingredients = Object.keys(props.ingredients)
    .map(igKey=>{        
        return [...Array(props.ingredients[igKey])].map((_,i) => {
           return <BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient>
        });        
    }).reduce((arr,el) => {
        return arr.concat(el)
    },[]);
    if(tranformedingredients.length ===0){
        tranformedingredients = <p>Please start adding ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {tranformedingredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );  
};

export default burger;