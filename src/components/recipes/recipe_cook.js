import React, { Component } from 'react'
import ingredients from './test_ingredients'

class RecipeCook extends Component {

    constructor() {
        super()
        this.state = {
            servings: '',
            cook: '',
            maxTimes: '',
            errors: []
        }
        this.cooking = this.cooking.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    // take ingredient data from somewhere
    componentDidMount() {
        this.cooking(ingredients, 1)
    }

    onChange(event, change) {
        const regex = /\D/g
        if (!change) {
            change = 0
        }
        let { name, value } = event.target
        if (value.match(regex)) {
            value.replace(this.state.cook)
        }
        if (!value) {
            value = 0
        }
        let newValue = parseInt([value]) + parseInt(change)
        if (newValue < 0) {
            newValue = 0
        }
        if (name === "cook") {
        this.setState(
            prevState => {
                return (
                    prevState["cook"] = parseInt(newValue),
                    prevState["servings"] = parseInt(newValue * this.props.data.servings)
                )
            })
        }
        if (name === "servings") {
            this.setState(
                prevState => {
                    return(
                        prevState["servings"] = parseInt(newValue),
                        prevState["cook"] = parseFloat(newValue / this.props.data.servings)
                    )
                }
            )
        }   
    }

    cooking(ingredientData, multiplier, cooking) {
        this.setState({ errors: [] })
        const dict = ingredientData.reduce(function (dict, ingredient) {
            (dict[ingredient.name] = ingredient)
            return dict
        }, {})
        const recipeIngredients = this.props.data.ingredients
        let newIngredients = []
        let maxTimes = []
        let lacking = {}
        recipeIngredients.forEach(
            ingredient => {
                if (ingredient.name in dict) {
                    if (dict[ingredient.name].quantity >= ingredient.quantity * multiplier) {
                        var newQuantity = dict[ingredient.name].quantity - ingredient.quantity * multiplier
                        newIngredients.push({ ...ingredient })
                        newIngredients[newIngredients.length - 1].quantity = newQuantity
                        maxTimes.push(Math.floor(dict[ingredient.name].quantity / ingredient.quantity))
                    }
                    else {
                        lacking[ingredient.name] = { quantity: (ingredient.quantity * multiplier - dict[ingredient.name].quantity), notIn: false }
                    }
                }
                else {
                    lacking[ingredient.name] = { notIn: true }
                }
            }
        )
        if (cooking) {
            // add way for user to see quantity cooked and new amount of ingredients
            if (newIngredients.length === recipeIngredients.length) {
                console.log(`You have cooked ${multiplier * this.props.data.servings} serving(s) of ${this.props.data.name}`)
                this.setState({ errors: [] })
            }
            // also if not enough ingredients, give option for user to add the lacking ingredients
            Object.keys(lacking).forEach(ingredient => {
                if (!lacking[ingredient].notIn) {
                    this.setState(prevState => {
                        const list = prevState.errors
                        list.push(<div key={ingredient}>You are lacking {lacking[ingredient].quantity} {dict[ingredient].measurement} of {ingredient}</div>)
                        return ({ errors: list })
                    })
                }
                else {
                    this.setState(prevState => {
                        const list = prevState.errors
                        list.push(<div key={ingredient}>Your pantry does not have {ingredient}</div>)
                        return ({ errors: list })
                    })
                }
            })
        }
        else {
            if (newIngredients.length === recipeIngredients.length) {
                this.setState({ cook: 1 })
                this.setState({servings: this.props.data.servings})
                console.log(this.state.servings)
                this.setState({ maxTimes: Math.min(...maxTimes) })
            }
            else {
                this.setState({ cook: 0, maxTimes: 0, servings: 0 })
            }
        }
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '1em'}}><h2>Enter the amount you would like to cook</h2></div>
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>Quantity: </h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="inventory-cancel-button" type="text" name="cook" value={this.state.cook} onClick={(event) => this.onChange(event, -1)}>-</button>
                    <input type="text" name="cook" value={this.state.cook} onChange={(event) => this.onChange(event)} />
                    <button className="recipe-cook-button" type="text" name="cook" value={this.state.cook} onClick={(event) => this.onChange(event, 1)}>+</button>
                    <button className="recipe-cook-button" type="text" name="cook" value={this.state.cook} onClick={(event) => this.onChange(event, parseInt(this.state.maxTimes - this.state.cook))}>MAX</button>
                    <div>
                        <button className="recipe-cook-button" onClick={() => this.cooking(ingredients, this.state.cook, true)}>COOK</button>
                    </div>
                </div>
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>Servings: </h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="inventory-cancel-button" type="text" name="servings" value={this.state.servings} onClick={(event) => this.onChange(event, -1)}>-</button>
                    <input type="text" name="cook" value={this.state.servings} onChange={(event) => this.onChange(event)} />
                    <button className="recipe-cook-button" type="text" name="servings" value={this.state.servings} onClick={(event) => this.onChange(event, 1)}>+</button>
                    <button className="recipe-cook-button" type="text" name="servings" value={this.state.servings} onClick={(event) => this.onChange(event, parseInt(this.state.maxTimes * this.props.data.servings - this.state.servings))}>MAX</button>
                    <div>
                        <button className="recipe-cook-button" onClick={() => this.cooking(ingredients, this.state.cook, true)}>COOK</button>
                    </div>
                </div>    
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    {this.state.errors}
                </div>
                
            </div>

        )
    }
}

export default RecipeCook