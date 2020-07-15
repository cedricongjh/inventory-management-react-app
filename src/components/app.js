import React, {Component} from "react"
import Inventory from './inventory/inventory'
import Recipes from './recipes'
import {Route, NavLink, HashRouter} from 'react-router-dom'

class App extends Component {
    render() {
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
             <Route path='/recipes' component={Recipes}></Route>
          </div>
        </HashRouter>
            
        )
    }

}

export default App