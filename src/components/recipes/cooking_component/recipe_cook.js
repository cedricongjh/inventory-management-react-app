import React, { Component } from 'react'
import IngredientDisplay from './ingredient_display/ingredient_display'
import IngredientLacking from './error_messages/ingredient_lacking'
import IngredientMissing from './error_messages/ingredient_missing'
import IngredientIgnored from './ingredient_display/ingredient_ignored'

class RecipeCook extends Component {

    constructor() {
        super()
        this.state = {
            servings: '',
            cook: '',
            maxTimes: '',
            ingredientView: [],
            recipeData: []
        }
        this.cooking = this.cooking.bind(this)
        this.onChange = this.onChange.bind(this)
        this.runCooking = this.runCooking.bind(this)
    }


    componentDidMount() {
        this.cooking(this.props.inventoryData.slice(), 1, false, true)
    }

    // need to fix bug where prevProps and prevState is equal to current props; clicking cook somehow immediately gives new inventory data
    componentDidUpdate(_prevProps, prevState) {
        if (prevState.maxTimes !== this.state.maxTimes) {
            this.setState(
                prevState => {
                    return (
                        prevState["cook"] = parseFloat(this.state.maxTimes),
                        prevState["servings"] = parseFloat(this.state.maxTimes * this.props.data.servings)
                    )
                }, this.cooking(this.props.inventoryData.slice(), this.state.maxTimes, false))
        }
    }

    runCooking() {
        this.cooking(this.props.inventoryData, this.state.cook, false)
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
            this.cooking(this.props.inventoryData.slice(), parseFloat(newValue), false)
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
            this.cooking(this.props.inventoryData.slice(), parseFloat(newValue / this.props.data.servings), false)
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
                if (ingredient.ignore) {
                    if (ingredient.name in dict) {
                    newIngredients.push({ ...ingredient })
                    newIngredients[newIngredients.length - 1].quantity = dict[ingredient.name].quantity
                    newIngredients[newIngredients.length - 1].id = dict[ingredient.name].id}
                    else {
                        newIngredients.push("dummy")
                    }
                    maxTimes.push(Math.pow(10, 1000))
                    ingredientDisplay.push(<IngredientIgnored 
                                            key={ingredient.name}
                                            recipeData={ingredient}
                                            InventoryData={ingredient}
                                            runCooking={this.runCooking}
                                            ignoreIngredient={this.props.ignoreIngredient}
                                            id={this.props.data.id} />)
                }
                else if (ingredient.name in dict) {
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
                            updateIngredient={this.props.updateIngredient}
                            runCooking={this.runCooking} 
                            ignoreIngredient={this.props.ignoreIngredient}
                            id={this.props.data.id}/>)
                    }
                    else {
                        lacking[ingredient.name] = { quantity: (ingredient.quantity * multiplier - dict[ingredient.name].quantity), notIn: false, measurement: ingredient.measurement, ignore: ingredient.ignore }
                        ingredientDisplay.push(<IngredientLacking
                            key={ingredient.name}
                            ingredient={{ [ingredient.name]: lacking[ingredient.name] }}
                            updateIngredient={this.props.updateIngredient}
                            runCooking={this.runCooking}
                            ignoreIngredient={this.props.ignoreIngredient}
                            id={this.props.data.id} />)
                    }
                }
                else {
                    lacking[ingredient.name] = { notIn: true, quantity: ingredient.quantity, measurement: ingredient.measurement }
                    ingredientDisplay.push(<IngredientMissing
                        key={ingredient.name}
                        ingredient={{ [ingredient.name]: lacking[ingredient.name] }}
                        updateIngredient={this.props.updateIngredient}
                        runCooking={this.runCooking}
                        ignoreIngredient={this.props.ignoreIngredient}
                        id={this.props.data.id} />)
                }
            }
        )

        this.setState({ ingredientDisplay: ingredientDisplay })
        if (cooking) {
            if (newIngredients.length === recipeIngredients.length) {
                console.log(`You have cooked ${multiplier * this.props.data.servings} serving(s) of ${this.props.data.name}`)
                // PATCH requests for new quantities of ingredients and update state in app 
                newIngredients.forEach(ingredient => {
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
                // update state in app component
                let inventoryData = this.props.inventoryData.slice()
                newIngredients.forEach(ingredient => {
                    for (let i = 0; i < inventoryData.length; i++) {
                        if (inventoryData[i].id === ingredient.id) {
                            inventoryData[i].quantity = ingredient.quantity
                        }
                    }
                })
                this.props.updateInventory(inventoryData)
                this.setState(
                    { cook: 0, servings: 0 }, this.cooking(this.props.inventoryData, 0, false)
                )
            }
        }
        else if (firstTime) {
            if (newIngredients.length === recipeIngredients.length) {
                this.setState({ cook: 1 })
                this.setState({ servings: this.props.data.servings })
                if (Math.min(...maxTimes) !== Infinity) {
                this.setState({ maxTimes: Math.min(...maxTimes) }) }
                else {
                    this.setState({ maxTimes : 1 })
                }
            }
            else {
                this.setState({ cook: 0, maxTimes: 0, servings: 0 })
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
                        this.cooking(this.props.inventoryData.slice(), 1, false, true);
                        this.onChange(event, parseInt(this.state.maxTimes - this.state.cook))
                    }}>MAX</button>
                    <div>
                        <button className="recipe-cook-button" onClick={() => {this.cooking(this.props.inventoryData.slice(), this.state.cook, true) }}>COOK</button>
                    </div>
                </div>
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>Servings: </h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="inventory-cancel-button" type="text" name="servings" value={this.state.servings} onClick={(event) => this.onChange(event, -1)}>-</button>
                    <input type="text" name="cook" value={this.state.servings} onChange={(event) => this.onChange(event)} />
                    <button className="recipe-cook-button" type="text" name="servings" value={this.state.servings} onClick={(event) => this.onChange(event, 1)}>+</button>
                    <button className="recipe-cook-button" type="text" name="servings" value={this.state.servings} onClick={(event) => {
                        this.cooking(this.props.inventoryData.slice(), 1, false, true);
                        this.onChange(event, parseInt(this.state.maxTimes * this.props.data.servings - this.state.servings))
                    }}>MAX</button>
                    <div>
                        <button className="recipe-cook-button" onClick={() => this.cooking(this.props.inventoryData.slice(), this.state.cook, true)}>COOK</button>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    {this.state.ingredientDisplay ? <div><h3>Inventory: </h3></div> : null}
                    {this.state.ingredientDisplay}
                </div>

            </div>

        )
    }
}

export default RecipeCook