import React, { Component } from 'react'
import ingredients from './test_ingredients'

class RecipeCook extends Component {

    constructor() {
        super()
        this.state = { cook: '',
                       maxTimes: ''}
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
        if (newValue > this.state.maxTimes) {
            newValue = this.state.maxTimes
        }
        this.setState(
            prevState => {
                return (
                    prevState[name] = parseInt(newValue)
                )
            })
    }

    cooking(ingredientData, multiplier, cooking) {
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
            }
            // also if not enough ingredients, give option for user to add the lacking ingredients
            Object.keys(lacking).forEach(ingredient => {
                if (!lacking[ingredient].notIn) {
                    console.log(`You are lacking ${lacking[ingredient].quantity} of ${ingredient}`)
                }
                else {
                    console.log(`Your pantry does not have ${ingredient}`)
                }
            })
        }
        else {
            this.setState({maxTimes: Math.min(...maxTimes)})
            if (newIngredients.length === recipeIngredients.length) {
            this.setState({cook: 1})
            }
            else {
                this.setState({cook: 0})
            }
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="text" name="cook" value={this.state.cook} onClick={(event) => this.onChange(event, -1)}>-</button>
                <input type="text" name="cook" value={this.state.cook} onChange={(event) => this.onChange(event)} />
                <button type="text" name="cook" value={this.state.cook} onClick={(event) => this.onChange(event, 1)}>+</button>
                <button type="text" name="cook" value={this.state.cook} onClick={(event) => this.onChange(event, parseInt(this.state.maxTimes - this.state.cook))}>MAX</button>
                <div>
                    <button className="recipe-cook-button" onClick={() => this.cooking(ingredients, this.state.cook, true)}>COOK</button>
                </div>
            </div>

        )
    }
}

export default RecipeCook