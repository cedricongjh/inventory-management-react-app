import React from 'react'


function IngredientLacking(props) {
    const name = Object.keys(props.ingredient)[0]
    return(
    <div style={{display: 'flex', flexDirection: 'row'}}>
    <div>Your pantry lacks {props.ingredient[name].quantity} {props.ingredient[name].measurement} of {name}</div>
    <button onClick={() => {props.updateIngredient([{...props.ingredient[name], name: name}])}}>+ {props.ingredient[name].quantity}</button>
    </div>
    )
}

export default IngredientLacking