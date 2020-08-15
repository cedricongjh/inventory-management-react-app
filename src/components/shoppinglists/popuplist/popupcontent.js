import React from 'react'

function PopUpContent(props) {
    const categories = props.data.categories.map(category => {
        let items = category.items.map(item => {
        return (<div key={item.name}><input type="checkbox"/>{item.name} {item.quantity} {item.measurement}</div>)
        })
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }} key={category.category}>
                <div style={{fontSize: '1.35em', textDecoration: 'underline'}}>{category.category}</div>
                {items}
            </div>)
    }
    )

    return (
        <div className='shoppinglist-content'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '1.5em', display: 'flex' }}>{props.data.name}</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start' }}>{categories}</div>
            </div>
        </div>
    )
}


export default PopUpContent