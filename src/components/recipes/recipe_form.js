import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as yup from 'yup'

function RecipeForm() {
    const initialValues = {
        name: '',
        categories: [''],
        description: '',
        time: { hours: '', minutes: '' },
        servings: '',
        ingredients: [{
            name: '',
            quantity: '',
            measurement: ''
        }],
        directions: ['']
    }
    const onSubmit = (values) => {
        console.log(values)
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
            measurement: yup.string().required('Required')
        })).min(1, 'requires at least one ingredient'),
        directions: yup.array().of(yup.string())
    })
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <div>Recipe Form</div>

                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <label htmlFor="name">Name</label>
                    <Field name="name" />
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
                                    {categories.map((category, index) => {
                                        return (
                                            <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Field name={`categories[${index}]`}></Field>
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
                    <Field name="time.hours" />
                    <ErrorMessage name="time.hours" />
                </div>

                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <label htmlFor="time.minutes">Minutes</label>
                    <Field name="time.minutes" />
                    <ErrorMessage name="time.minutes" />
                </div>

                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <label htmlFor="servings">Servings</label>
                    <Field name="servings" />
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
                                        (ingredient, index) => {
                                            return (
                                                <div key={index} style={{ display: 'flex', flexDirection: "row" }}>
                                                    <Field name={`ingredients[${index}].name`} placeholder="name" />
                                                    <ErrorMessage name={`ingredients[${index}].name`} />
                                                    <Field name={`ingredients[${index}].quantity`} placeholder="quantity" />
                                                    <ErrorMessage name={`ingredients[${index}].quantity`} />
                                                    <Field name={`ingredients[${index}].measurement`} placeholder="measurement" />
                                                    <ErrorMessage name={`ingredients[${index}].measurement`} />
                                                    {index > 0 ? <button type="button" onClick={() => remove(index)}>-</button> : null}
                                                    <button type="button" onClick={() => push({ name: '', quantity: '', measurement: '' })}>+</button>
                                                </div>
                                            )
                                        }
                                    )}


                                </div>)
                        }
                        }
                    </FieldArray>
                    
                    <label htmlFor="directions">Directions: </label>
                    <FieldArray name="directions">
                        {fieldArrayProps => {
                            const { push, remove, form } = fieldArrayProps
                            const { values } = form
                            const { directions } = values
                            return(
                                <div>
                                    {directions.map((direction, index)=> {
                                        return(
                                            <div key={index}>
                                            <label htmlFor={`directions[${index}]`}>Step {index+1}: </label>
                                            <Field as="textarea" name={`directions[${index}]`}/>
                                            {index > 0 ? <button type="button" onClick={() => remove(index)}>-</button> : null}
                                            <button type="button" onClick={() => push('')}>+</button>
                                            </div>
                                        )
                                    })}

                                </div>
                            )

                        }}

                    </FieldArray>
                    <ErrorMessage name="directions"/>
                </div>

                <button type="submit">Sumbit</button>

            </Form>
        </Formik>
    )
}

export default RecipeForm