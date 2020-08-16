import React from 'react'

function PopUpContent(props) {
    const categories = props.data.categoryOrder.map(key => {
        const category = props.data.categories[key]
        let items = category.items.map(item => {
        return (<div key={props.data.items[item].name}><input type="checkbox"/>{props.data.items[item].name} {props.data.items[item].name.quantity} {props.data.items[item].name.measurement}</div>)
        })
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }} key={category.name}>
                <div style={{fontSize: '1.35em', textDecoration: 'underline'}}>{category.name}</div>
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