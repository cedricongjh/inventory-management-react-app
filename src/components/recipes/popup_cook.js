import React from 'react'
import RecipeCook from './recipe_cook'

function PopUpCook(props) {
    return(
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={() => props.handleClick('cookPopup')}>
            X
            </span>
                <RecipeCook data={props.data} inventoryData={props.inventoryData}/>
            </div>
        </div>
    )
}

export default PopUpCook