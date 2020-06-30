import React from 'react'

function InventoryItem(props) {
    return (
    <div className="ingredient">   
    <div>{props.info.name}</div>
    <div>{props.info.quantity} {props.info.measurement}</div>
    </div> 
    )
}

export default InventoryItem