import React from 'react'

function RecipeView(props) {
    const categories = props.data.categories.map(category => {
        return(<div style={{marginLeft: '2%', marginRight: '1%'}}key={category}>{category}</div>)
    })
    const ingredients = props.data.ingredients.map(ingredient => {
    return(<div style={{'paddingBottom': '1em'}} key={ingredient.name}>{ingredient.quantity} {ingredient.measurement} {ingredient.name}</div>)
    })
    const directions = props.data.instructions.map((instruction, index) => {
    return(<div style={{'paddingBottom': '1em'}} key={index}>Step {index+1}: {instruction}</div>)
    })
return(<div>
    <div className="recipe-page-container">
        <div className="recipe-header">{props.data.name}</div>
        <div className="recipe-categories">{categories}</div>
    </div>
    <div className="recipe-page-image"><img src={props.data.image_url} alt="dish"></img></div>
    <div className="recipe-page-description" style={{'paddingBottom': '1em'}}>{props.data.description}</div>
    <div className="ingredients-container">
        <div style={{'display': 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <div style={{'paddingBottom': '1em'}}>Time required: {props.data.time} mins</div>
        <div style={{'paddingBottom': '1em'}}>Serves: {props.data.servings}</div>
        </div>
        <div style={{'paddingBottom': '1em'}}>Ingredients: </div>
        <div>{ingredients}</div>
        <div style={{'paddingBottom': '1em'}}>Instructions: </div>
        <div>{directions}</div>
    </div>
    <div className="sidenav">
        <button className="recipe-edit-button">EDIT</button>
        <button className="recipe-cook-button">COOK</button>
        <button className="recipe-cook-button">ADD NEW RECIPE</button>
    </div>   
    </div>)
}

export default RecipeView