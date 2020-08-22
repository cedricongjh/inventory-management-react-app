import React from 'react'
import {Formik, Form, Field} from 'formik'

// need to style as modal

function CreateIngredient(props) {
    const initialValues = {'name': props.name, 'measurement': '', 'url': ''}

    const onSubmit = (values) => {
        props.updateField(values)
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <Field name='name' />
                <Field name='measurement' />
                <button type="submit">Sumbit</button>
                <button onClick={() => {onSubmit(null)}}>Cancel</button>
            </Form>
        </Formik>
    )
}


export default CreateIngredient