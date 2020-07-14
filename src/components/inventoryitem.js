import React from 'react'
import InventoryForm from './inventoryform'

function InventoryItem(props) {
    return props.info.edit ? 
    <div className="ingredient"><InventoryForm data={props} /></div> :
    props.info.name ?
    (<div className="ingredient" onClick={() => props.handleClick(props.info.id)}>
    <img src={props.info.image} alt="ingredient"/>       
    <div>{props.info.name}</div>
    <div>{props.info.quantity} {props.info.measurement}</div>
    </div>)
    :
    (<div className="ingredient"><button className="plus-button" onClick={() => props.handleClick(props.info.id)}>+</button></div>)
}

export default InventoryItem