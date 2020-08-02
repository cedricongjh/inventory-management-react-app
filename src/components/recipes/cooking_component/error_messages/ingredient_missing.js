import React from 'react'

function IngredientMissing(props) {
    const name = Object.keys(props.ingredient)[0]
    return(
        <div>You do not have {name} in your pantry!</div>
    )
}

export default IngredientMissing