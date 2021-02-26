import React, { useEffect, useState } from 'react'
import { Address } from '../../interface/misc.model'

export default function AddressForm(props: {value: Address, onChange: ((v: any) => any)}) {
  const [address, setAddress] = useState({...props.value})

  const inputHandler = (field: string, value: string) => {
    setAddress({
      ...address,
      [field]: value
    })
  }

  useEffect(() => {
    if (props.onChange) {
      props.onChange(address)
    }
  }, [address])

  return (
    <div>

        <div className="flex flex-row items-center sm:w-3/4 sm:mx-auto">
          <div className="w-3/4 p-2">
            <input type="text" placeholder="Dirección" className="px-2 py-2 w-full"
                value={address.address}
                onChange={(e) => inputHandler('address', e.target.value)} />
          </div>
          <div className="w-1/4 py-2">
            <input type="text" placeholder="Código Postal" className="px-2 py-2 w-full"
                value={address.postalCode}
                onChange={(e) => inputHandler('postalCode', e.target.value)} />
          </div>
        </div>
        <div className="flex flex-row items-center sm:w-3/4 sm:mx-auto pb-2">
          <div className="w-1/2 px-2">
            <input type="text" placeholder="Ciudad" className="w-full px-2 py-2"
              value={address.city}
              onChange={(e) => inputHandler('city', e.target.value)} />
          </div>
          <div className="w-1/2">
            <input type="text" placeholder="Estado / Provincia" className="w-full px-2 py-2"
              value={address.state}
              onChange={(e) => inputHandler('state', e.target.value)} />
          </div>
        </div>
    </div>
  )
}
