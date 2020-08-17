import React from 'react'
import DragList from './drag and drop/draglist'

function PopUpList(props) {
    return(
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={() => props.handleClick('editPopup')}>
            X
            </span>
                <DragList data={props.data} updateShoppingList={props.updateShoppingList}/>
            </div>
        </div>
    )
}


export default PopUpList