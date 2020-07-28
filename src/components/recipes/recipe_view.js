import React, {Component} from 'react'
import PopUpForm from './popup_form'
import PopUpEdit from './popup_edit'
import PopUpCook from './popup_cook'


class RecipeView extends Component {

    constructor(){
        super()
        this.state = {formPopup: false,
                      editPopup: false,
                      cookPopup: false}
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(name) {
        this.setState(prevState => {
            return(
                {[name]: !prevState[name]}
            )
        })
    }

    render(){
    const categories = this.props.data.categories.map(category => {
        return(<div style={{marginLeft: '2%', marginRight: '1%'}}key={category}>{category}</div>)
    })
    const ingredients = this.props.data.ingredients.map(ingredient => {
    return(<div style={{'paddingBottom': '1em'}} key={ingredient.name}>{ingredient.quantity} {ingredient.measurement} {ingredient.name}</div>)
    })
    const directions = this.props.data.instructions.map((instruction, index) => {
    return(<div style={{'paddingBottom': '1em'}} key={index}>Step {index+1}: {instruction}</div>)
    })
    return(<div>
    
    <div className="recipe-page-container">
        <div className="recipe-header">{this.props.data.name}</div>
        <div className="recipe-categories">{categories}</div>
    </div>
    <div className="recipe-page-image"><img src={this.props.data.image_url} alt="dish"></img></div>
    <div className="recipe-page-description" style={{'paddingBottom': '1em'}}>{this.props.data.description}</div>
    <div className="ingredients-container">
        <div style={{'display': 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <div style={{'paddingBottom': '1em'}}>Time required: {this.props.data.time.minutes} mins</div>
        <div style={{'paddingBottom': '1em'}}>Serves: {this.props.data.servings}</div>
        </div>
        <div style={{'paddingBottom': '1em'}}>Ingredients: </div>
        <div>{ingredients}</div>
        <div style={{'paddingBottom': '1em'}}>Instructions: </div>
        <div>{directions}</div>
    </div>
    <div className="sidenav">
        <button className="recipe-edit-button" onClick={() => this.handleClick('editPopup')}>EDIT</button>
        <button className="recipe-cook-button" onClick={() => this.handleClick('cookPopup')}>COOK</button>
        <button className="recipe-cook-button" onClick={() => this.handleClick('formPopup')}>ADD NEW RECIPE</button>
    </div>
    {this.state.formPopup? <PopUpForm handleClick={this.handleClick}/> : null}
    {this.state.editPopup? <PopUpEdit handleClick={this.handleClick} data={this.props.data}/> : null}
    {this.state.cookPopup? <PopUpCook handleClick={this.handleClick} data={this.props.data} inventoryData={this.props.inventoryData}/> : null}
    </div>)}
}

export default RecipeView