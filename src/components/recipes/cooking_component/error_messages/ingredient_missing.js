import React from 'react'

function IngredientMissing(props) {
    const name = Object.keys(props.ingredient)[0]
    return(
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <input type="checkbox" checked={props.ingredient[name].ignore} onChange={async() => {await props.ignoreIngredient({name: name}, props.id); props.runCooking()}}></input>
        <div>You do not have {name} in your pantry!</div>
        </div>
    )
}

export default IngredientMissing