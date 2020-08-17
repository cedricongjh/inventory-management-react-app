import React from 'react'
import ShoppingListCard from './shoppinglistcard'

function ShoppingLists(props) {
    const shoppinglists = props.data.map(shoppinglist => {
        return(<ShoppingListCard key={shoppinglist.name} data={shoppinglist} updateShoppingList={props.updateShoppingList}/>)
    })

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>{shoppinglists}
        </div>
    )
}

export default ShoppingLists