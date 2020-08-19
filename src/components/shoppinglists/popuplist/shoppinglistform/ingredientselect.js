import React from 'react'
import CreatableSelect from 'react-select/creatable'

class IngredientSelect extends React.Component {
	constructor() {
		super()
		this.state = {
			value: null,
			options: todosData,
			isLoading: false,
			popupform: null
		}
	}

	updateField = (values) => {
        const newOption = this.createOption(values.name)
        this.setState(prevState => 
            {
                return {value: newOption, options: [...prevState.options, newOption], isLoading: false, popupform: null}}
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
		this.setState({popup: true, popupform: <PopUpForm name={inputValue} updateField={this.updateField}/>})
	}


	render() {
		const checklistitems = this.state.options.map(todo => {
			return ({ 'label': [todo.text], 'value': [todo.text] })
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