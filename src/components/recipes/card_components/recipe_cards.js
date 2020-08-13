import React from 'react'
import RecipeCard from './recipe_card'

function RecipeCards(props) {
    const recipes = props.data.map(recipe => {
        return (<RecipeCard data={recipe} key={recipe.id} />)
    })
    return (
        <div className="recipe-container">
            {recipes}
            <div className="recipe-card" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{margin: 'auto', padding: '2em, 2em, 2em, 2em', font: '16px'}}>
                    <button className="recipe-cook-button" onClick={() => props.handleClick('formPopup')}>ADD NEW RECIPE</button>
                </div>
            </div>
        </div>
    )
}

export default RecipeCards