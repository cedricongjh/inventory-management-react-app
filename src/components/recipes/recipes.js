import React, {Component} from 'react'
import RecipeCards from './card_components/recipe_cards'

class Recipes extends Component {

    render() {
        console.log(this.props.recipeData)
        return(
            <RecipeCards data={this.props.recipeData}/>
        )
    }
}

export default Recipes