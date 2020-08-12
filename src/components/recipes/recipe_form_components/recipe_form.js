import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as yup from 'yup'

// add styling for form

function RecipeForm(props) {
    const initialValues = props.data? props.data : {
        name: '',
        categories: [''],
        description: '',
        time: { hours: '', minutes: '' },
        servings: '',
        ingredients: [{
            name: '',
            quantity: '',
            measurement: '',
            ignore: false
        }],
        instructions: ['']
    }
    const onSubmit = (values) => {
        console.log(values)
        if (props.type === 'editPopup') {
            fetch('recipe/' + props.data.id, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            }).then(response => {
                if (response.ok) {
                    props.updateRecipe(values)
                    props.handleClick(props.type)
                    return response.json()
                }
            }).then(data => {
                console.log('success', data)
            })
            .catch((error) => {
                console.error('Error:', error);
            })  
        } else if (props.type === 'formPopup') {
            
        }
    }
    const validationSchema = yup.object().shape({
        name: yup.string().required('A name is required'),
        categories: yup.array().of(yup.string()),
        description: yup.string(),
        time: yup.object().shape({
            hours: yup.number().typeError('Hours must be a number'),
            minutes: yup.number().typeError('Minutes must be a number')
        }),
        servings: yup.number().typeError('Servings must be a number'),
        ingredients: yup.array().of(yup.object().shape({
            name: yup.string().required('Required'),
            quantity: yup.number().required('Required').typeError('Please input numerial values'),
            measurement: yup.string().required('Required'),
            ignore: yup.boolean()
        })).min(1, 'requires at least one ingredient'),
        instructions: yup.array().of(yup.string())
    })
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <div>Recipe Form</div>

                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <label htmlFor="name">Name</label>
                    <Field className="rounded-input" name="name" />
                    <ErrorMessage name="name" />
                </div>

                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <label htmlFor="categories">Categories</label>
                    <FieldArray name="categories">
                        {fieldArrayProps => {
                            const { push, remove, form } = fieldArrayProps
                            const { values } = form
                            const { categories } = values
                            return (
                                <div>
                                    {categories.map((_category, index) => {
                                        return (
                                            <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Field className="rounded-input" name={`categories[${index}]`}></Field>
                                                <ErrorMessage name={`categories[${index}]`} />
                                                {index > 0 ? <button type="button" onClick={() => remove(index)}>-</button> : null}
                                                <button type="button" onClick={() => push('')}>+</button>
                                            </div>)
                                    }
                                    )}

                                </div>
                            )
                        }
                        }
                    </FieldArray>
                </div>


                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <label htmlFor="description">Description</label>
                    <Field as="textarea" name="description" />
                    <ErrorMessage name="description" />
                </div>


                <div>Time required: </div>
                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <label htmlFor="time.hours">Hours</label>
                    <Field className="rounded-input" name="time.hours" />
                    <ErrorMessage name="time.hours" />
                </div>

                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <label htmlFor="time.minutes">Minutes</label>
                    <Field className="rounded-input" name="time.minutes" />
                    <ErrorMessage name="time.minutes" />
                </div>

                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <label htmlFor="servings">Servings</label>
                    <Field className="rounded-input" name="servings" />
                    <ErrorMessage name="servings" />
                </div>

                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <label htmlFor="ingredients">Ingredients:</label>
                    <FieldArray name="ingredients">
                        {fieldArrayProps => {
                            const { push, remove, form } = fieldArrayProps
                            const { values } = form
                            const { ingredients } = values
                            return (
                                <div>
                                    {ingredients.map(
                                        (_ingredient, index) => {
                                            return (
                                                <div key={index} style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap", marginBottom: '1em'}}>
                                                    <div style={{ display: 'flex', flexDirection: "column" }}>
                                                    <Field className="rounded-input" name={`ingredients[${index}].name`} placeholder="name" />
                                                    <ErrorMessage name={`ingredients[${index}].name`} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: "column" }}>
                                                    <Field className="rounded-input" name={`ingredients[${index}].quantity`} placeholder="quantity" />
                                                    <ErrorMessage name={`ingredients[${index}].quantity`} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: "column" }}>
                                                    <Field className="rounded-input" name={`ingredients[${index}].measurement`} placeholder="measurement" />
                                                    <ErrorMessage name={`ingredients[${index}].measurement`} />
                                                    </div>
                                                    <Field name={`ingredients[${index}].ignore`} type="checkbox" />
                                                    {index > 0 ? <button type="button" onClick={() => remove(index)}>-</button> : null}
                                                    <button type="button" onClick={() => push({ name: '', quantity: '', measurement: '', ignore: false })}>+</button>            
                                                </div>
                                            )
                                        }
                                    )}


                                </div>)
                        }
                        }
                    </FieldArray>
                    
                    <label htmlFor="instructions">Directions: </label>
                    <FieldArray name="instructions">
                        {fieldArrayProps => {
                            const { push, remove, form } = fieldArrayProps
                            const { values } = form
                            const { instructions } = values
                            return(
                                <div>
                                    {instructions.map((direction, index)=> {
                                        return(
                                            <div key={index}>
                                            <label htmlFor={`instructions[${index}]`}>Step {index+1}: </label>
                                            <Field as="textarea" name={`instructions[${index}]`}/>
                                            {index > 0 ? <button type="button" onClick={() => remove(index)}>-</button> : null}
                                            <button type="button" onClick={() => push('')}>+</button>
                                            </div>
                                        )
                                    })}

                                </div>
                            )

                        }}

                    </FieldArray>
                    <ErrorMessage name="instructions"/>
                </div>

                <button type="submit">Sumbit</button>

            </Form>
        </Formik>
    )
}

export default RecipeForm