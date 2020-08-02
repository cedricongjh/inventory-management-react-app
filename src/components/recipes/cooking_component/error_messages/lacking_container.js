import React from 'react'
import IngredientLacking from './ingredient_lacking'
      
function LackingContainer(props) {
    const names = Object.keys(props.data)
    let lackings = []
    names.forEach((ingredient) => {
        lackings.push(<IngredientLacking key={ingredient} ingredient={{[ingredient]: props.data[ingredient]}}/>)
    })
    return(
        <div>
            {lackings.length !== 0? <h3>You do not have enough of these ingredients: </h3>: null}
        {lackings}
        </div>
    )  
}

export default LackingContainer