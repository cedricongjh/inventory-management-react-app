import React from 'react'
import {Link} from 'react-router-dom'

function RecipeCard(props){

    const categories = props.data.categories.map(category => {
        return(<div style={{marginLeft: '2%', marginRight: '1%'}}key={category}>{category}</div>)
    })
    return (
        <div className="recipe-card">
            <div style={{paddingBottom: '0', paddingTop: '1em'}}>
            <Link to={"/recipes/" + props.data.name} style={{display: 'block'}}>
                <img src={props.data.url} style={{width: "90%", marginLeft: '5%', marginRight: '5%', height: '50%'}} alt="dish"/>
            </Link>
            </div>
            <div style={{display: 'flex', justifyContent:'space-between', marginLeft: '5%', marginRight: '5%'}}>
                <div style={{display: 'flex'}}>{props.data.name}</div>
                <div style={{display: 'flex'}}>
                    <img style={{width: "1em", height: "1em", paddingTop: "0.2em", paddingRight: "0.1em"}} src='\images\clock.png' alt="clock" />{props.data.time.minute}min
                </div>
            </div>
            <div style={{marginLeft: '5%'}}>Servings: {props.data.servings}</div>
            <div style={{marginLeft: '5%', display: 'flex', flexWrap:'wrap'}}><div>Categories:</div> {categories}</div>          
        </div>
    )
}


export default RecipeCard