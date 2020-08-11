import React from 'react'
import RecipeForm from './recipe_form'

function PopUpEdit(props) {
    return(
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={() => props.handleClick('editPopup')}>
            X
            </span>
                <RecipeForm data={props.data} updateRecipe={props.updateRecipe} handleClick={props.handleClick} type='editPopup'/>
            </div>
        </div>
    )
}

export default PopUpEdit