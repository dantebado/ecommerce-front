import React from 'react'
import DefaultFooter from './DefaultFooter'
import DefaultHeader from './DefaultHeader'

function DefaultLayout(props) {
  return (
    <div>
      <DefaultHeader></DefaultHeader>
      <div>
        {props.children}
      </div>
      <DefaultFooter></DefaultFooter>
    </div>
  )
}

export default DefaultLayout