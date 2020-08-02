import React, {Component} from "react"
import Inventory from './inventory/inventory'
import Recipes from './recipes/recipes'
import {Route, NavLink, HashRouter} from 'react-router-dom'
import RecipeView from './recipes/recipe_view'
import items from './items'
import LackingContainer from "./recipes/cooking_component/error_messages/lacking_container"

class App extends Component {
    constructor() {
      super()
      this.state = {recipeData: [],
                    inventoryData: []}
      this.updateInventory = this.updateInventory.bind(this)
      this.updateIngredient = this.updateIngredient.bind(this)              
    }

    componentDidMount() {
      // get recipe data from API
        this.setState({recipeData: items})
        fetch('/inventory').then(response => response.json()).then(result => {
          this.setState({inventoryData: result})
        })
    }

    updateInventory(data) {
        this.setState({inventoryData: data}, console.log(this.state.inventoryData))
    }

    updateIngredient(data) {
      this.setState(prevState => {
        let inventory = prevState.inventoryData
        data.forEach(
          ingredient => {
              for (let i = 0; i < inventory.length;i++) {
                if(inventory[i].name === ingredient.name) {
                  inventory[i].quantity = parseFloat(inventory[i].quantity) + parseFloat(ingredient.quantity)  
                }
              }  
          })
        return {inventoryData : inventory}
      }, console.log(this.state.inventoryData))
    }

    render() {
        const recipeLinks = this.state.recipeData.map(item => {
          let recipeData = item
          return(<Route exact path={'/recipes/'+ item.name}  key={item.name} render={(props) => <RecipeView {...props} data={recipeData} inventoryData={this.state.inventoryData}
          updateInventory={this.updateInventory} updateIngredient={this.updateIngredient}/>} />)
        })
        return(
        <HashRouter>
          <h1>MENU</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/inventory">Inventory</NavLink></li>
            <li><NavLink to="/recipes">Recipes</NavLink></li>
          </ul>
          <div className="content">
             <Route exact path='/' component={LackingContainer}></Route>
             <Route path='/inventory' render={(props) => <Inventory {...props} update={this.updateInventory}/>}></Route>
             <Route exact path='/recipes' component={Recipes}></Route>
             {recipeLinks}
          </div>
          
        </HashRouter>
            
        )
    }

}

export default App