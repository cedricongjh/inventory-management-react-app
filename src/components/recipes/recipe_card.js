import React from 'react'

function RecipeCard(props){

    const categories = props.data.categories.map(category => {
        return(<div style={{marginLeft: '2%', marginRight: '1%'}}key={category}>{category}</div>)
    })
    return (
        <div className="recipe-card">
            <img className="recipe-card-image" src={props.data.image_url} alt="dish" />
            <div style={{display: 'flex', justifyContent:'space-between', marginLeft: '5%', marginRight: '5%'}}>
                <div style={{display: 'flex'}}>{props.data.name}</div>
                <div style={{display: 'flex'}}>
                    <img style={{width: "1em", height: "1em", paddingTop: "0.2em", paddingRight: "0.1em"}} src='\images\clock.png' alt="clock" />{props.data.time}min
                </div>
            </div>
            <div style={{marginLeft: '5%'}}>Servings: {props.data.servings}</div>
            <div style={{marginLeft: '5%', display: 'flex', flexWrap:'wrap'}}><div>Categories:</div> {categories}</div>          
        </div>
    )
}


export default RecipeCard