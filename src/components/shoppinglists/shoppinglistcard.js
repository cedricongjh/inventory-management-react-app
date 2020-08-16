import React, { Component } from 'react'
import PopUpList from './popuplist/popuplist'

class ShoppingListCard extends Component {

    constructor() {
        super()
        this.state = {
            popUp: ''
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.setState({ popUp: false })
    }

    handleClick() {
        this.setState(prevState => {
            return (
                { popUp: !prevState.popUp }
            )
        })
    }

    render() {
        const categories = this.props.data.categoryOrder.map(key => {
            const category = this.props.data.categories[key]
            const bought = category.items.reduce((currentValue, item) => {
                return this.props.data.items[item].bought? currentValue + 1: currentValue
            }, 0)
            const total = category.items.length
            return(
            <div key={category.name} style={{fontSize:'1.1em'}}>{category.name}: {bought}/{total}</div>
            )
        })
        return (
            <div>
                <div className='shoppinglist-card' onClick={() => this.handleClick()}>
                    <div style={{paddingTop: '1em', fontSize: '1.5em'}}>{this.props.data.name}</div>
                    {categories}
                </div>
                {this.state.popUp? <PopUpList handleClick={this.handleClick} data={this.props.data}/> : null}
            </div>
        )
    }
}

export default ShoppingListCard