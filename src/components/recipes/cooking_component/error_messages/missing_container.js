import React from 'react'
import IngredientMissing from './ingredient_missing'

function MissingContainer(props) {
    const names = Object.keys(props.data)
    let lackings = []
    names.forEach((ingredient) => {
        lackings.push(<IngredientMissing key={ingredient} ingredient={{[ingredient]: props.data[ingredient]}}/>)
    })
    return(
        <div>
            {lackings.length !== 0 ? <h3>You do not have these ingredients: </h3> : null}
        {lackings}
        </div>
    )
}

export default MissingContainer