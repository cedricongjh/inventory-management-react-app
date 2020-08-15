import React from 'react'
import PopUpContent from './popupcontent'

function PopUpList(props) {
    return(
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={() => props.handleClick('editPopup')}>
            X
            </span>
                <PopUpContent data={props.data}/>
            </div>
        </div>
    )
}


export default PopUpList