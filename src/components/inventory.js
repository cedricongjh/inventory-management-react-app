import React from "react"
import InventoryItem from './inventoryitem'
import items from './items'


class Inventory extends React.Component {
    constructor() {
        super()
        this.state = {data: [], length: items.length}
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    // insert api call here
    componentDidMount() {
        // fetch('/inventory').then(response => response.json()).then(result => {
        //        this.setState({data: result})
        //     })
        // const items = this.state.data
        console.log("mounted") 
        items.map(item => item.edit = false)
        items.push({id: items.length + 1,
            name: "",
            quantity: "",
            measurement: "",
            image: "",
            edit: false})
        this.setState({
            data: items 
        })     
    }

    handleClick(id) {
        this.setState(prevState => {
            let updatedData = prevState.data.map(
                item => {
                    if (item.id === id) {
                        item.edit = !item.edit
                    }
                    return item
                }
            )
            if (id >= prevState.data.length) {
                updatedData.push({id: prevState.data.length + 1,
                    name: "",
                    quantity: "",
                    measurement: "",
                    image: "",
                    edit: false})}     
            for (let i = 0;i<updatedData.length;i++) {
                updatedData[i].id = i+1
            }      
            return {
                data: updatedData
            }
        }
            )   
    }

    handleChange(event, id) {
        const {name, value} = event.target
        this.setState(prevState => {
            const updatedData = prevState.data.map(
                item => {
                    if (item.id === id) {
                        item[name] = value
                    }
                    return item
                }
            )
            return {
                data: updatedData
            }
        }
            )   

    }
   // HANDLE POST OR PATCH REQUEST
    handleSubmit(){
        console.log("SUBMIT CLICKED")
    }
   // fix bugs
    handleCancel(id) {
        this.setState(prevState => {
            var updatedData = prevState.data.map(
                item => {
                    if (item.id > this.state.length && item.id === id) {
                        item.edit = !item.edit
                        item.quantity = ''
                        item.measurement = ''
                        item.name = ''
                    }
                    else if (item.id === id) {
                        item.edit = !item.edit
                    }
                    return item
                }
            ).filter(item => {
                if (item.id > this.state.length && item.id === id) {
                    return false     
                }
                return true
            }
            )
            for (let i = 0;i<updatedData.length;i++) {
                updatedData[i].id = i+1
            }   
            return {
                data: updatedData
            }
        }
            )
    }

    render() {
        const items = this.state.data.map(item => <InventoryItem info={item} key={item.id} handleClick={this.handleClick} handleChange={this.handleChange} 
            handleSubmit = {this.handleSubmit} handleCancel= {this.handleCancel}/>)
        return ( 
        <div className = "inventory">
            {items}
            {/* change location of save and cancel buttons */}
            {/* <div className="ingredient">
                <div className="inventory-button-container">
                <button className="inventory-save-button">SAVE</button>
                <button className="inventory-cancel-button">CANCEL</button>
                </div>
            </div> */}
        </div>
        )
    }
}

export default Inventory