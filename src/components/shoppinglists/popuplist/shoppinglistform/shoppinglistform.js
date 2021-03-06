import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as yup from 'yup'

function convertData(data) {
    const categoryKeys = data.categoryOrder
    return (categoryKeys.map(key => {
        return ({
            'name': key, 'items': data.categories[key].items.map(item => {
                return ({ ...data.items[item] })
            })
        })
    })
    )
}

function ShoppingListForm(props) {
    const initialValues = props.data
        ? { 'name': props.data.name, 'shoppinglist': convertData(props.data) }
        : { 'name': '', 'shoppinglist': [{ 'name': '', 'items': [{ 'name': '' }] }] }

    const onSubmit = (values) => {
        console.log(values)
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('A name is required'),
        shoppinglist: yup.array().of(yup.object().shape({
            name: yup.string().required('A name is required'),
            items: yup.array().of(yup.object().shape({
                name: yup.string().required('A name is required')
            }))
        }))
    })

    return (
        <div className='shoppinglist-content'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form>
                        <Field name='name' style={{ fontSize: '1.5em', display: 'flex' }}></Field>
                        <ErrorMessage name='name'></ErrorMessage>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        <button className="inventory-save-button" onClick={() => { props.changeMode('edit', 'view') }}>SAVE</button>
                                        <button className="inventory-cancel-button" onClick={() => { props.changeMode('edit', 'view') }}>CANCEL</button>
                        </div>
                        <FieldArray name="shoppinglist" style={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start' }}>
                            {fieldArrayProps => {
                                const { push, remove, form } = fieldArrayProps
                                const { values } = form
                                const { shoppinglist } = values
                                return (
                                    shoppinglist.map((_shoppinglist, index) => {
                                        const current_index = index
                                        return (
                                            <div key={index}>
                                                <Field name={`shoppinglist[${index}].name`} style={{fontSize: '1.35em'}}></Field>
                                                {index > 0 ? <button type="button" onClick={() => remove(index)}>-</button> : null}
                                                {index === shoppinglist.length - 1 ? <button type="button" onClick={() => push({ 'name': '', 'items': [{ 'name': '' }] })}>+</button> : null}
                                                <FieldArray name={`shoppinglist[${index}].items`}>
                                                    {fieldArrayProps => {
                                                        const { push, remove, form } = fieldArrayProps
                                                        const { values } = form
                                                        const { items } = values.shoppinglist[index]
                                                        return (
                                                            items.map((_item, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <Field name={`shoppinglist[${current_index}].items[${index}].name`}></Field>
                                                                        {index > 0 ? <button type="button" onClick={() => remove(index)}>-</button> : null}
                                                                        <button type="button" onClick={() => push('')}>+</button>
                                                                    </div>
                                                                )
                                                            })
                                                        )
                                                    }}
                                                </FieldArray>
                                            </div>
                                        )
                                    })
                                )

                            }}
                        </FieldArray>

                        
                    </Form>
                </div>
            </Formik>

        </div>
    )
}


export default ShoppingListForm
