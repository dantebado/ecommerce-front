import React from 'react'

export default function CurrencyDisplay(props: {amount: number}) {
  return (
    <span>{`ARS ${props.amount}`}</span>
  )
}
