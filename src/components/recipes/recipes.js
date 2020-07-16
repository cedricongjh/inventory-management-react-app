import React, {Component} from 'react'
import RecipeCard from './recipe_card'
import items from '../items'

class Recipes extends Component {
    constructor() {
        super()
        this.state = {data: []
    }
   }

   componentDidMount() {
       this.setState({data: items})       
   }
    
    render() {
        const recipes = this.state.data.map(recipe => {
            return(<RecipeCard data={recipe} key={recipe.id} />)
        })
        return (
        <div className="recipe-container">
        {recipes}
        </div>
        )
    }
}

export default Recipes