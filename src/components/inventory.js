import React from "react"
import InventoryItem from './inventoryitem'
import items from './items'
import EditInventory from './editinventory.js'
import {Route, NavLink, HashRouter} from 'react-router-dom'


class Inventory extends React.Component {
    constructor() {
        super()
        this.state = {data: []}
    }

    componentDidMount() {
        this.setState({
            data: items 
        })
    }

    render() {
        const items = this.state.data.map(item => <InventoryItem info={item} key={item.id}/>)
        return (
        <HashRouter>
            <NavLink to= '/inventory/edit'>Edit</NavLink>
            <Route exact path= '/inventory/edit' component={EditInventory}></Route>   
        <div className = "inventory">{items}</div>
        </HashRouter> 
        )
    }
}

export default Inventory