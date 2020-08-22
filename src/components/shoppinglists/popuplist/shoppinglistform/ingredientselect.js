import React from 'react'
import CreatableSelect from 'react-select/creatable'
import CreateIngredient from './createingredient'

// requires inventorydata, updateInventory

class IngredientSelect extends React.Component {
	constructor() {
		super()
		this.state = {
			value: null,
			isLoading: false,
			popupform: null
		}
	}

	updateField = (values) => {
		if (!values) {
			this.setState(prevState => {
				return {value: prevState.value, isLoading: false, popupform: null}
			})
			return
		}
		const newOption = this.createOption(values.name)
		this.props.updateInventory([...this.props.data, {...values, 'quantity': 0}])
        this.setState( 
            {value: newOption, isLoading: false, popupform: null}
				)			
	}

	createOption = (label) => ({
		label,
		value: label.toLowerCase().replace(/\W/g, ''),
	})

	handleChange = (newValue, actionMeta) => {
		console.group('Value Changed')
		console.log(newValue)
		console.log(`action: ${actionMeta.action}`)
		console.groupEnd();
		this.setState({ value: newValue })
	}

	handleCreate = (inputValue) => {
		this.setState({ isLoading: true })
		this.setState({popupform: <CreateIngredient name={inputValue} updateField={this.updateField}/>})
	}


	render() {
		const checklistitems = this.props.data.map(ingredient=> {
			return {'label': ingredient.name, 'value': ingredient.name}
		})
		return (
			<div>
				<CreatableSelect
					isClearable
					isDisabled={this.state.isLoading}
					isLoading={this.state.isLoading}
					onChange={this.handleChange}
					onCreateOption={this.handleCreate}
					options={checklistitems}
					value={this.state.value}
				/>
				{this.state.popupform}
			</div>
		)
	}
}

export default IngredientSelect