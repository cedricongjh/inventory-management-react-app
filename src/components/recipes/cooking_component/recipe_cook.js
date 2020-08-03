import React, { Component } from 'react'
import IngredientDisplay from './ingredient_display/ingredient_display'
import IngredientLacking from './error_messages/ingredient_lacking'
import IngredientMissing from './error_messages/ingredient_missing'

class RecipeCook extends Component {

    constructor() {
        super()
        this.state = {
            servings: '',
            cook: '',
            maxTimes: '',
            ingredientView: [],
            errors: [],
            inventoryData: [],
            recipeData: []
        }
        this.cooking = this.cooking.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    // take ingredient data from somewhere
    componentDidMount() {
        this.setState({ inventoryData: this.props.inventoryData.slice() }, this.cooking(this.props.inventoryData.slice(), 1, false, true))
    }

    // need to fix bug where prevProps and prevState is equal to current props and state
    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps.inventoryData, 1)
        console.log(this.props.inventoryData, 2)
        console.log(this.state.maxTimes, 3)
        console.log(prevState.maxTimes, 4)
        if (prevState.maxTimes !== this.state.maxTimes && prevState.maxTimes) {
            console.log("called maxTimes modified")
            this.setState(
                prevState => {
                    return (
                        prevState["cook"] = parseFloat(this.state.maxTimes),
                        prevState["servings"] = parseFloat(this.state.maxTimes * this.props.data.servings)
                    )
                }, this.cooking(this.state.inventoryData, 1, false, true))
        }
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
            this.cooking(this.state.inventoryData, newValue, false)
            this.setState(
                prevState => {
                    return (
                        prevState["cook"] = parseFloat(newValue),
                        prevState["servings"] = parseFloat(newValue * this.props.data.servings)
                    )
                }
            )
        }
        if (name === "servings") {
            this.cooking(this.state.inventoryData, parseFloat(newValue / this.props.data.servings), false)
            this.setState(
                prevState => {
                    return (
                        prevState["servings"] = parseFloat(newValue),
                        prevState["cook"] = parseFloat(newValue / this.props.data.servings)
                    )
                }
            )
        }
    }

    cooking(ingredientData, multiplier, cooking, firstTime = false) {
        console.log(ingredientData, 5)
        this.setState({ errors: [] })
        let inventory = ingredientData.slice()
        const dict = inventory.reduce(function (dict, ingredient) {
            (dict[ingredient.name] = ingredient)
            return dict
        }, {})
        const recipeIngredients = this.props.data.ingredients.slice()
        let newIngredients = []
        let maxTimes = []
        let lacking = {}
        let ingredientDisplay = []
        recipeIngredients.forEach(
            ingredient => {
                if (ingredient.name in dict) {
                    if (dict[ingredient.name].quantity >= ingredient.quantity * multiplier) {
                        var newQuantity = dict[ingredient.name].quantity - ingredient.quantity * multiplier
                        newIngredients.push({ ...ingredient })
                        newIngredients[newIngredients.length - 1].quantity = newQuantity
                        newIngredients[newIngredients.length - 1].id = dict[ingredient.name].id
                        maxTimes.push(Math.floor(dict[ingredient.name].quantity / ingredient.quantity))
                        ingredientDisplay.push(<IngredientDisplay
                            key={ingredient.name}
                            multiplier={multiplier}
                            InventoryData={dict[ingredient.name]}
                            recipeData={ingredient} 
                            updateIngredient={this.props.updateIngredient}/>)
                    }
                    else {
                        lacking[ingredient.name] = { quantity: (ingredient.quantity * multiplier - dict[ingredient.name].quantity), notIn: false, measurement: ingredient.measurement }
                        ingredientDisplay.push(<IngredientLacking 
                            key={ingredient.name} 
                            ingredient={{ [ingredient.name]: lacking[ingredient.name] }}
                            updateIngredient={this.props.updateIngredient} />)
                    }
                }
                else {
                    lacking[ingredient.name] = { notIn: true, quantity: ingredient.quantity, measurement: ingredient.measurement }
                    ingredientDisplay.push(<IngredientMissing 
                        key={ingredient.name} 
                        ingredient={{ [ingredient.name]: lacking[ingredient.name] }} />)
                }
            }
        )
        this.setState({ ingredientDisplay: ingredientDisplay })
        if (cooking) {
            if (newIngredients.length === recipeIngredients.length) {
                console.log(`You have cooked ${multiplier * this.props.data.servings} serving(s) of ${this.props.data.name}`)
                this.setState({ errors: [] })
                // PATCH requests for new quantities of ingredients and update state
                newIngredients.forEach(ingredient => {
                    console.log(ingredient)
                    fetch('/item/' + ingredient.id, {
                        method: "PATCH",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(ingredient)
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(data => {
                            console.log('success', data)
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        })
                })
                // make sure state is updated in this component as well
                let inventoryData = this.state.inventoryData.slice()
                newIngredients.forEach(ingredient => {
                    for (let i = 0; i < inventoryData.length; i++) {
                        if (inventoryData[i].id === ingredient.id) {
                            inventoryData[i].quantity = ingredient.quantity
                        }
                    }
                })
                this.setState({ inventoryData: inventoryData }, this.props.updateInventory(this.state.inventoryData), this.cooking(this.state.inventoryData, 1, false))
                this.setState(prevState => {
                    return { maxTimes: prevState.maxTimes - multiplier }
                })
            }
        }
        else if (firstTime) {
            if (newIngredients.length === recipeIngredients.length) {
                this.setState({ cook: 1 })
                this.setState({ servings: this.props.data.servings })
                this.setState({ maxTimes: Math.min(...maxTimes) })
            }
            else {
                this.setState({ cook: 0, maxTimes: 0, servings: 0 })
                this.cooking(this.props.inventoryData.slice(), 0, false)
            }
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1em' }}><h2>Enter the amount you would like to cook</h2></div>
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>Quantity: </h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="inventory-cancel-button" type="text" name="cook" value={this.state.cook} onClick={(event) => this.onChange(event, -1)}>-</button>
                    <input type="text" name="cook" value={this.state.cook} onChange={(event) => this.onChange(event)} />
                    <button className="recipe-cook-button" type="text" name="cook" value={this.state.cook} onClick={(event) => this.onChange(event, 1)}>+</button>
                    <button className="recipe-cook-button" type="text" name="cook" value={this.state.cook} onClick={(event) => {
                        this.cooking(this.state.inventoryData, 1, false);
                        this.onChange(event, parseInt(this.state.maxTimes - this.state.cook))
                    }}>MAX</button>
                    <div>
                        <button className="recipe-cook-button" onClick={() => this.cooking(this.state.inventoryData, this.state.cook, true)}>COOK</button>
                    </div>
                </div>
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>Servings: </h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="inventory-cancel-button" type="text" name="servings" value={this.state.servings} onClick={(event) => this.onChange(event, -1)}>-</button>
                    <input type="text" name="cook" value={this.state.servings} onChange={(event) => this.onChange(event)} />
                    <button className="recipe-cook-button" type="text" name="servings" value={this.state.servings} onClick={(event) => this.onChange(event, 1)}>+</button>
                    <button className="recipe-cook-button" type="text" name="servings" value={this.state.servings} onClick={(event) => {
                        this.cooking(this.state.inventoryData, 1, false);
                        this.onChange(event, parseInt(this.state.maxTimes * this.props.data.servings - this.state.servings))
                    }}>MAX</button>
                    <div>
                        <button className="recipe-cook-button" onClick={() => this.cooking(this.state.inventoryData, this.state.cook, true)}>COOK</button>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    {this.state.ingredientDisplay ? <div><h3>Inventory: </h3></div> : null}
                    {this.state.ingredientDisplay}
                    {this.state.errors}
                </div>

            </div>

        )
    }
}

export default RecipeCook