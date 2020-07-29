import React from 'react'
import RecipeForm from './recipe_form'

function PopUpForm(props) {
    return (
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={() => props.handleClick('formPopup')}>
            X
            </span>
                <RecipeForm />
            </div>
        </div>
    )
}

export default PopUpForm