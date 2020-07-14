import React from 'react'

function InventoryForm(props) {
    return (
        <div>
            {props.data.info.image ? <img src={props.data.info.image} alt="ingredient" /> : <button>Upload Image</button>}
            <form>
                <div>
                <input
                    name="name"
                    type="text"
                    value={props.data.info.name}
                    size="20"
                    placeholder="name"
                    onChange={(event) => props.data.handleChange(event, props.data.info.id)}>
                </input>
                </div>
                <div>
                <input
                    name="quantity"
                    type="text"
                    value={props.data.info.quantity}
                    size="10"
                    placeholder="quantity"
                    onChange={(event) => props.data.handleChange(event, props.data.info.id)}></input>
                <input
                    name="measurement"
                    type="text"
                    value={props.data.info.measurement}
                    size="10"
                    placeholder="measurement"
                    onChange={(event) => props.data.handleChange(event, props.data.info.id)}></input>
                </div>    
                <div className="inventory-button-container">
                <button className="inventory-save-button" onClick={() => props.data.handleSubmit(props.data.info.id)}>SAVE</button>
                <button className="inventory-cancel-button" onClick={() => props.data.handleCancel(props.data.info.id)}>CANCEL</button>
                </div>
            </form>
        </div>
    )
}

export default InventoryForm