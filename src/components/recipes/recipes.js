import React, {Component} from 'react'
import RecipeCards from './card_components/recipe_cards'
import items from '../items'

class Recipes extends Component {
    constructor() {
        super()
        this.state = {data: []}
   }

    componentDidMount() {
        this.setState({data: items})
    }

    render() {
        return(
            <RecipeCards data={this.state.data}/>
        )
    }
}

export default Recipes