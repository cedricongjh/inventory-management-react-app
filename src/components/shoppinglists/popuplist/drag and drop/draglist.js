import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

class DragList extends Component {

    constructor() {
        super()
        this.onDragEnd = this.onDragEnd.bind(this)
    }

    onDragEnd(result) {
        const { draggableId, type, destination, source } = result
        if (type === "column") {
            let newColumnOrder = Array.from(this.props.data.categoryOrder)
            newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, draggableId)
            const newState = {
                ...this.props.data,
                categoryOrder: newColumnOrder
            }
            this.props.updateShoppingList(newState)
            return
        }

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return
        }

        const start = this.props.data.categories[source.droppableId]
        const end = this.props.data.categories[destination.droppableId]

        if (start === end) {
            let newItemOrder = Array.from(start.items)
            newItemOrder.splice(source.index, 1)
            newItemOrder.splice(destination.index, 0, draggableId)
            const newCategory = {
                ...start,
                items: newItemOrder
            }

            const newState = {
                ...this.props.data,
                categories: {
                    ...this.props.data.categories,
                    [newCategory.name]: newCategory
                }
            }

            this.props.updateShoppingList(newState)
            return
        }

        let startItemOrder = Array.from(start.items)
        let endItemOrder = Array.from(end.items)
        startItemOrder.splice(source.index, 1)
        endItemOrder.splice(destination.index, 0, draggableId)
        const newState = {
            ...this.props.data,
            categories: {
                ...this.props.data.categories,
                [start.name]: {
                    ...start,
                    items: startItemOrder
                },
                [end.name]: {
                    ...end,
                    items: endItemOrder
                }
            }
        }
        this.props.updateShoppingList(newState)
        return
    }


    render() {
        const categories = this.props.data.categoryOrder.map((key, index) => {
            const category = this.props.data.categories[key]
            let items = category.items.map((item, index) => {
                return (
                    <Draggable key={this.props.data.items[item].name} index={index} draggableId={this.props.data.items[item].name} >
                        {(provided) => <div
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <input type="checkbox" />
                                <div {...provided.dragHandleProps}>{this.props.data.items[item].name} {this.props.data.items[item].quantity} {this.props.data.items[item].measurement}</div>
                            </div>
                        </div>}
                    </Draggable>)
            })
            return (
                <Draggable key={category.name} index={index} draggableId={category.name}>
                    {(provided) => {
                        return (
                            <div key={key}
                                ref={provided.innerRef}
                                {...provided.draggableProps}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: '1.35em', textDecoration: 'underline' }} {...provided.dragHandleProps}>{category.name}</div>
                                    <Droppable droppableId={category.name}>

                                        {(provided) =>
                                            <div key={category.name} ref={provided.innerRef} {...provided.droppableProps} >
                                                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '2em' }}>
                                                    {items}
                                                    {provided.placeholder}
                                                </div>
                                            </div>}

                                    </Droppable>
                                </div>
                            </div>)
                    }}
                </Draggable>)
        })
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="all-columns" type="column">
                    {(provided) =>
                        <div key='all-columns'
                            ref={provided.innerRef}
                            {...provided.draggableProps}>
                            <div className='shoppinglist-content'>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: '1.5em', display: 'flex' }}>{this.props.data.name}</div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        <button className="inventory-save-button" onClick={() => { this.props.changeMode('reorder', 'view') }}>SAVE</button>
                                        <button className="inventory-cancel-button" onClick={() => { this.props.changeMode('reorder', 'view') }}>CANCEL</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start' }}>
                                        {categories}
                                    </div>
                                </div>
                            </div>
                            {provided.placeholder}
                        </div>}
                </Droppable>
            </DragDropContext>
        )


    }
}


export default DragList