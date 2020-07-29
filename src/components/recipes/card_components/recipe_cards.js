import React from 'react'
import RecipeCard from './recipe_card'

function RecipeCards(props) {
    const recipes = props.data.map(recipe => {
        return(<RecipeCard data={recipe} key={recipe.id} />)
    })
    return (
    <div className="recipe-container">
    {recipes}
    </div>
    )
}

export default RecipeCards