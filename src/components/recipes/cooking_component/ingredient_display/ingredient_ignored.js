import React from 'react'

function IngredientIgnored(props) {
    
    return(
        <div style={{display: 'flex', flexDirection: 'row', color: 'grey'}}>
            <input type="checkbox" checked={props.recipeData.ignore} onChange={async() => {await props.ignoreIngredient({name: props.InventoryData.name}, props.id); await props.runCooking()}}></input>
            <div style={{paddingLeft: '1em'}}>{props.InventoryData.name} ignored</div>
        </div>

    )
    
}

export default IngredientIgnored