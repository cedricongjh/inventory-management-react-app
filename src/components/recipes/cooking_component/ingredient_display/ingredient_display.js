import React from 'react'

function IngredientDisplay(props) {
    const minus = parseFloat(props.recipeData.quantity * props.multiplier) 
    const final = parseFloat(props.InventoryData.quantity - minus)
    const ignore = !props.recipeData.ignore? {display: 'flex', flexDirection: 'row'} : {display: 'flex', flexDirection: 'row', color: 'grey', textDecoration: 'line-through'}

    return (
    <div style={ignore}>
    <input type="checkbox" checked={props.recipeData.ignore} onChange={async() => {await props.ignoreIngredient({name: props.InventoryData.name}, props.id); await props.runCooking()}}></input>
    <div>{props.InventoryData.quantity} {props.InventoryData.measurement} {props.InventoryData.name}</div>
    {(minus !== 0)? 
    <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{color: 'red', paddingLeft: '1em', paddingRight: '1em'}}>-{minus} {props.InventoryData.measurement}</div>
    <div>{final} {props.InventoryData.measurement}</div></div> : null }
    </div>
    )
}

export default IngredientDisplay