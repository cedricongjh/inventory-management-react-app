import React, {Component} from "react"
import Inventory from './inventory/inventory'
import Recipes from './recipes/recipes'
import {Route, NavLink, HashRouter} from 'react-router-dom'
import RecipeView from './recipes/recipe_view'
import items from './items'

class App extends Component {
    constructor() {
      super()
      this.state = {data: []}
    }

    componentDidMount() {
        this.setState({data: items})
    }

    render() {
        const recipeLinks = this.state.data.map(item => {
          let recipeData = item
          return(<Route exact path={'/recipes/'+ item.name}  key={item.name} render={(props) => <RecipeView {...props} data={recipeData}/>} />)
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
             <Route exact path='/'></Route>
             <Route path='/inventory' component={Inventory}></Route>
             <Route exact path='/recipes' component={Recipes}></Route>
             {recipeLinks}
          </div>
        </HashRouter>
            
        )
    }

}

export default App