import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import FieldComponent from "../components/forms/Field"
import { Field } from "../interface/forms.model"
import { StateTypes } from "../redux/Store"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EmailRegex } from "../utils/Regex"
import { useTranslation } from "next-i18next"
import getConfig from 'next/config';

export default function Home(props) {
  const counter = useSelector((state: StateTypes) => state.counter)
  const dispatch = useDispatch()

  const i18Validation = useTranslation('validation').t
  const i18Common = useTranslation('common').t

  console.log(process.env.NEXT_PUBLIC_TEST)

  const [loginPayload, setLoginPayload] = useState({
    email: ''
  })

  const clickHandler = (action: string) => {
    dispatch({
      type: action
    })
  }

  const inputHandler = (field, value) => {
    setLoginPayload({
      ...loginPayload,
      [field]: value
    })
  }

  const form: {fields: Field[]} = {
    fields: [
      {
        placeholder: 'carlospedro@gmail.com',
        label: i18Common('formEmail'),
        type: 'email',
        value: loginPayload.email,
        handler: (v) => { inputHandler('email', v) },
        validation: (v) => !(EmailRegex.test(v)) ? {valid: false, message: i18Validation('email')} : {valid: true}
      }
    ]
  }

  return (
    <div className="w-screen h-screen flex items-center justify-around">
      <div className="text-center">
        <h1 className="mb-3">ECommerce</h1>

        <div>
          <h3>{i18Common('counter')} {counter.value}</h3>

          <div className="mt-6 font-bold">
            <button className="px-6 py-2 mx-3" onClick={() => clickHandler('COUNTER_DECREASE')}>-</button>
            <button className="px-6 py-2 mx-3" onClick={() => clickHandler('COUNTER_INCREASE')}>+</button>
          </div>
        </div>

        <div className="mt-6">
          <FieldComponent field={form.fields[0]} />

          <p className="mt-12">{i18Common('yourEmailIs')} {loginPayload.email}</p>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  }
})