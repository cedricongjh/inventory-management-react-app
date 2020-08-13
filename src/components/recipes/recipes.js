import React, {Component} from 'react'
import RecipeCards from './card_components/recipe_cards'
import PopUpForm from './recipe_form_components/popup_form'

class Recipes extends Component {

    constructor() {
        super()
        this.state = {formPopup: false}
        this.handleClick = this.handleClick.bind(this)       
    }

    handleClick(name) {
        this.setState(prevState => {
            return (
                { [name]: !prevState[name] }
            )
        })
    }

    render() {
        return(
            <div>
            <RecipeCards data={this.props.recipeData} handleClick={this.handleClick}/>
            {this.state.formPopup? <PopUpForm handleClick={this.handleClick} updateRecipe={this.props.updateRecipe}></PopUpForm> : null}
            </div>
        )
    }
}

export default Recipes