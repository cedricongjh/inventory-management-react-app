import React from 'react'
import {Formik, Form, Field} from 'formik'

function CreateIngredient(props) {
    const initialValues = {'name': props.name, 'measurement': '', 'url': ''}

    const onSubmit = (values) => {
        console.log(values)
        props.updateField(values)
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <Field name='name' />
                <Field name='measurement' />
            </Form>
        </Formik>
    )
}


export default CreateIngredient