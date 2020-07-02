import React, {Component} from 'react'

class Recipes extends Component {
    constructor() {
        super()
        this.state = {data: ''
    }
   }
    
    componentDidMount() {
        fetch('/test').then(response => response.json()).then(result => {
            this.setState({data: result.test})
        }) 
    }
    render() {
        console.log(this.state.data)
        return (
        <p>{this.state.data}</p>
        )
    }
}

export default Recipes