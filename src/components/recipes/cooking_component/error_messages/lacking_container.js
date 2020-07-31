import React from 'react'
import IngredientLacking from './ingredient_lacking'

const lacking = {'test': {quantity: 10, measurment: 'pcs'}, 'test1': {quantity: 10, measurment: 'pcs'}, 'test2': {quantity: 10, measurment: 'pcs'}}        

function LackingContainer() {
    const names = Object.keys(lacking)
    let lackings = []
    names.forEach((ingredient) => {
        lackings.push(<IngredientLacking ingredient={{[ingredient]: {quantity: 10, measurment: 'pcs'}}}/>)
    })
    return(
        <div>
        {lackings}
        </div>
    )  
}

export default LackingContainer