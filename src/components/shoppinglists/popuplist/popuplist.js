import React, {Component} from 'react'
import DragList from './drag and drop/draglist'
import PopUpContent from './popupcontent'
import ShoppingListForm from './shoppinglistform/shoppinglistform'

class PopUpList extends Component {

    constructor() {
        super()
        this.state = {
            edit: false,
            view: true,
            reorder: false
        }
        this.changeMode = this.changeMode.bind(this)
    }

    changeMode(currentMode, newMode) {
        this.setState({
            [currentMode]: false,
            [newMode]: true
        })
    }

    render() {
        return(
            <div className="modal">
                <div className="modal-content">
                <span className="close" onClick={() => this.props.handleClick('editPopup')}>
                X
                </span>
                    {this.state.view? <PopUpContent data={this.props.data} changeMode={this.changeMode}/> :
                     this.state.edit? <ShoppingListForm data={this.props.data} changeMode={this.changeMode}/> :
                     this.state.reorder? <DragList data={this.props.data} updateShoppingList={this.props.updateShoppingList} changeMode={this.changeMode}/>: null}
                </div>
            </div>
        )
    }
    
}


export default PopUpList