import React, { Component } from 'react'
import PopUpForm from './recipe_form_components/popup_form'
import PopUpEdit from './recipe_form_components/popup_edit'
import PopUpCook from './cooking_component/popup_cook'


class RecipeView extends Component {

    constructor() {
        super()
        this.state = {
            formPopup: false,
            editPopup: false,
            cookPopup: false
        }
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
        const categories = this.props.data.categories.map(category => {
            return (<div style={{ marginLeft: '2%', marginRight: '1%' }} key={category}>{category}</div>)
        })
        const ingredients = this.props.data.ingredients.map(ingredient => {
            return (<div style={{ 'paddingBottom': '1em' }} key={ingredient.name}>{ingredient.quantity} {ingredient.measurement} {ingredient.name}</div>)
        })
        const directions = this.props.data.instructions.map((instruction, index) => {
            return (<div style={{ 'paddingBottom': '1em' }} key={index}>Step {index + 1}: {instruction}</div>)
        })
        return (<div>

            <div className="recipe-view-container">
                <div className="recipe-page-container">
                    <div className="recipe-header">{this.props.data.name}</div>
                    <div className="recipe-categories">{categories}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="ingredients-container">
                        <div className="recipe-text-wrapper">
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', position: 'relative'}}>
                        <div><img src={this.props.data.url} className='recipe-page-image' alt="dish"></img></div>
                        <div className="sidenav">
                            <button className="recipe-edit-button" onClick={() => this.handleClick('editPopup')}>EDIT</button>
                            <button className="recipe-cook-button" onClick={() => this.handleClick('cookPopup')}>COOK</button>
                            <button className="recipe-cook-button" onClick={() => this.handleClick('formPopup')}>ADD NEW RECIPE</button>
                        </div>
                        </div>
                        <div className="recipe-page-description" style={{ 'paddingBottom': '1em' }}>{this.props.data.description}</div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ 'paddingBottom': '1em' }}>Time required: {this.props.data.time.minutes} mins</div>
                            <div style={{ 'paddingBottom': '1em', paddingLeft: '2em' }}>Serves: {this.props.data.servings}</div>
                        </div>
                        <div style={{ 'paddingBottom': '1em' }}>Ingredients: </div>
                        <div>{ingredients}</div>
                        <div style={{ 'paddingBottom': '1em' }}>Instructions: </div>
                        <div style={{maxWidth: '45em'}}>{directions}</div>
                        </div>
                    </div>
                </div>
                {this.state.formPopup ? <PopUpForm handleClick={this.handleClick} updateRecipe={this.props.updateRecipe}/> : null}
                {this.state.editPopup ? <PopUpEdit handleClick={this.handleClick} data={this.props.data} updateRecipe={this.props.updateRecipe} /> : null}
                {this.state.cookPopup ? <PopUpCook handleClick={this.handleClick} data={this.props.data} inventoryData={this.props.inventoryData} updateInventory={this.props.updateInventory}
                    updateIngredient={this.props.updateIngredient} ignoreIngredient={this.props.ignoreIngredient} /> : null}
            </div>
        </div>)
    }
}

export default RecipeView