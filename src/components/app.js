import React, { Component } from "react"
import Inventory from './inventory/inventory'
import Recipes from './recipes/recipes'
import ShoppingLists from './shoppinglists/shoppinglists'
import Home from './home/home'
import { Route, NavLink, HashRouter } from 'react-router-dom'
import RecipeView from './recipes/recipe_view'
import items from './items'

class App extends Component {
  constructor() {
    super()
    this.state = {
      recipeData: [],
      inventoryData: [],
      shoppinglistData: []
    }
    this.updateInventory = this.updateInventory.bind(this)
    this.updateIngredient = this.updateIngredient.bind(this)
    this.ignoreIngredient = this.ignoreIngredient.bind(this)
    this.updateRecipe = this.updateRecipe.bind(this)
  }

  componentDidMount() {
    this.setState({shoppinglistData: items})
    fetch('/recipes').then(response => response.json()).then(result => {
      this.setState({ recipeData: result })
    })
    fetch('/inventory').then(response => response.json()).then(result => {
      this.setState({ inventoryData: result })
    })
  }

  ignoreIngredient(data, recipeId) {
    this.setState(prevState => {
      let prevRecipeData = [...prevState.recipeData[recipeId - 1].ingredients]
      for (let i = 0; i < prevRecipeData.length; i++) {
        if (prevRecipeData[i].name === data.name) {
          prevRecipeData[i].ignore = !prevRecipeData[i].ignore
        }
      }
      return (
        prevState.recipeData[recipeId - 1].ingredients = prevRecipeData
      )
    })
  }

  updateInventory(data) {
    this.setState({ inventoryData: data }, console.log(this.state.inventoryData))
  }

  updateIngredient(data) {
    this.setState(prevState => {
      let inventory = [...prevState.inventoryData]
      data.forEach(
        ingredient => {
          for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].name === ingredient.name) {
              inventory[i].quantity = parseFloat(inventory[i].quantity) + parseFloat(ingredient.quantity)
            }
          }
        })
      return { inventoryData: inventory }
    }, console.log(this.state.inventoryData))
  }

  updateRecipe(data, push = false) {
    this.setState(prevState => {
      let prevRecipeData = [...prevState.recipeData]
      let newData = []
      if (!push) {
        prevRecipeData.forEach(
          recipe => {
            if (recipe.id === data.id) {
              recipe = { ...data }
              newData.push(recipe)
            }
            else {
              newData.push(recipe)
            }
          }
        )
      } else {
        console.log(data)
        newData = [...prevRecipeData]
        newData.push(data)
      }
      return { recipeData: newData }
    })
  }

  render() {
    const recipeLinks = this.state.recipeData.map(item => {
      let recipeData = item
      return (<Route exact path={'/recipes/' + item.name} key={item.name} render={(props) => <RecipeView {...props} data={recipeData} inventoryData={this.state.inventoryData}
        updateInventory={this.updateInventory} updateIngredient={this.updateIngredient} ignoreIngredient={this.ignoreIngredient} updateRecipe={this.updateRecipe} />} />)
    })
    return (
      <HashRouter>
        <h1>MENU</h1>
        <ul className="header">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/inventory">Inventory</NavLink></li>
          <li><NavLink to="/recipes">Recipes</NavLink></li>
          <li><NavLink to="/shoppinglists">Shopping Lists</NavLink></li>
        </ul>
        <div className="content">
          <Route exact path='/' render={(props) => <Home {...props}></Home>}></Route>
          <Route path='/inventory' render={(props) => <Inventory {...props} update={this.updateInventory} />}></Route>
          <Route exact path='/recipes' render= {(props) => <Recipes {...props} recipeData={this.state.recipeData} updateRecipe={this.updateRecipe}/>}></Route>
          <Route exact path='/shoppinglists' render={(props) => <ShoppingLists {...props} data={this.state.shoppinglistData}/>}></Route>
          {recipeLinks}
        </div>

      </HashRouter>

    )
  }

}

export default App