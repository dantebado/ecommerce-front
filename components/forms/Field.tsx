import React, { Fragment, useState } from 'react'
import { Field } from './../../interface/forms.model'

function FieldComponent(props: { field: Field }) {
  const [errorMessage, setErrorMessage] = useState('')
  const field = props.field

  const changeHandler = (v) => {
    field.handler(v)
    if (field.validation) {
      let validationResult = field.validation(v)
      if (!validationResult.valid) {
        setErrorMessage(validationResult.message)
        return
      }
    }
    setErrorMessage('')
  }

  return (
    <Fragment>
      {
        field.type == 'text' || field.type == 'number' || field.type == 'password' || field.type == 'email' ? (
          <div className="text-left">
            <label className="display-block mb-1">{field.label || 'Input'}</label>

            <input className="w-full"
              type={field.type || 'text'}
              placeholder={field.placeholder || 'Ingresá aquí'}
              value={field.value} onChange={(e) => changeHandler(e.target.value)}
              {...field.props} />

            <p className="mt-1">{errorMessage}</p>
          </div>
        ) : (
          <Fragment></Fragment>
        )
      }
    </Fragment>
  )
}


export default FieldComponent

