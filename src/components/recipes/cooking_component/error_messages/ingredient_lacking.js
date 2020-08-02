import React from 'react'


function IngredientLacking(props) {
    const name = Object.keys(props.ingredient)[0]
    return(
    <div>Your pantry lacks {props.ingredient[name].quantity} {props.ingredient[name].measurement} of {name}</div>
    )
}

export default IngredientLacking