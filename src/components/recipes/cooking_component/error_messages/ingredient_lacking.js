import React from 'react'


function IngredientLacking(props) {
    const name = Object.keys(props.ingredient)[0]
    const ignore = !props.ingredient[name].ignore? {display: 'flex', flexDirection: 'row'} : {display: 'flex', flexDirection: 'row', color: 'grey', textDecoration: 'line-through'}
    const add = !props.ingredient[name].ignore? <button onClick={async() => {await props.updateIngredient([{...props.ingredient[name], name: name}]); props.runCooking()}}>ADD</button> : null
    return(
    <div style={ignore}>
    <input type="checkbox" checked={props.ingredient[name].ignore} onChange={async() => {await props.ignoreIngredient({name: name}, props.id); props.runCooking()}}></input>
    <div style={{paddingRight: '1em'}}>Your pantry lacks {props.ingredient[name].quantity} {props.ingredient[name].measurement} of {name}</div>
    {add}
    </div>
    )
}

export default IngredientLacking