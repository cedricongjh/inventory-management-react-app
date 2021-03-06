import React from "react"
import InventoryItem from './inventoryitem'


class Inventory extends React.Component {
    constructor() {
        super()
        this.state = { data: [] }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    // insert api call here
    componentDidMount() {
        fetch('/inventory').then(response => response.json()).then(result => {
            let items = result
            items = items.map(item => {
                item.edit = false
                item.inServer = true
                return item
            })
            items.push({
                array_id: items.length + 1,
                name: "",
                quantity: "",
                measurement: "",
                image: "",
                edit: false,
                inServer: false
            })
            this.setState({
                data: items,
                length: items.length,
                lastClickData: []
            })
        })
    }

    handleClick(id) {
        this.setState(prevState => {
            let updatedData = prevState.data.map(
                item => {
                    if (item.array_id === id) {
                        item.edit = !item.edit
                    }
                    return item
                }
            )
            for (let i = 0; i < updatedData.length; i++) {
                updatedData[i].array_id = i + 1
            }

            if (id === updatedData.length) {
                updatedData.push({
                    array_id: prevState.data.length + 1,
                    name: "",
                    quantity: "",
                    measurement: "",
                    image: "",
                    edit: false,
                    inServer: false
                })
            }
            return {
                data: updatedData
            }
        }
        )
        this.setState(prevState => {
            const newData = prevState.lastClickData
            for (let i = 0; i < prevState.data.length; i++) {
                if (prevState.data[i].id === id) {
                    newData.push({ ...prevState.data[i] })
                }
            }
            return {
                lastClickData: newData
            }
        })
    }

    handleChange(event, array_id) {
        const { name, value } = event.target
        this.setState(prevState => {
            const updatedData = prevState.data.map(
                item => {
                    if (item.array_id === array_id) {
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
    handleSubmit(data) {
        let ids = this.state.data.map(item => {
            return item.inServer ? item.id : null
        })
        ids = ids.filter((value) => {
            return value !== null
        })
        const newData = { ...data, ids : ids }
        if (data.inServer === false) {
            fetch('/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            })
                .then(response => response.json())
                .then(data => {
                    this.setState(prevState => {
                        const updatedData = prevState.data.map(item => {
                            if (item.array_id === newData.array_id) {
                                item.edit = !item.edit
                                item.inServer = true
                                item.id = data.id
                            }
                            return item
                        })
                        return {
                            data: updatedData
                        }
                    }, this.props.update(this.state.data), console.log('success', data))
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
        else {
            fetch('/item/' + data.id, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        this.setState(prevState => {
                            const updatedData = prevState.data.map(item => {
                                if (item.array_id === data.array_id) {
                                    item.edit = !item.edit
                                }
                                return item
                            })
                            return {
                                data: updatedData
                            }
                        }, this.props.update(this.state.data))
                    }
                    console.log(this.state.data)
                    return response.json()
                })
                .then(data => {
                    console.log('success', data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }

    handleCancel(id) {
        this.setState(prevState => {
            let updatedData = prevState.data.map(
                item => {
                    if (item.inServer && item.array_id === id) {
                        for (let k = 0; k < prevState.lastClickData.length; k++) {
                            if (prevState.lastClickData[k].array_id === id) {
                                item = prevState.lastClickData[k]
                            }
                        }
                        item.edit = false
                    }
                    else if (item.inServer === false && item.array_id === id) {
                        item.edit = !item.edit
                        item.quantity = ''
                        item.measurement = ''
                        item.name = ''
                        item.inServer = false
                    }
                    return item
                }
            ).filter(item => {
                if (item.edit === false && item.inServer === false && item.array_id === id) {
                    return false
                }
                return true
            }
            )
            for (let i = 0; i < updatedData.length; i++) {
                updatedData[i].array_id = i + 1
            }
            return {
                data: updatedData
            }
        }
        )
        this.setState(prevState => {
            const newData = prevState.lastClickData.filter(
                item => {
                    if (item.array_id === id) {
                        return false
                    }
                    return true
                }
            )
            return {
                lastClickData: newData
            }
        })
    }

    render() {
        const items = this.state.data.map(item => <InventoryItem info={item} key={item.array_id} handleClick={this.handleClick} handleChange={this.handleChange}
            handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />)
        return (
            <div className="inventory">
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