import { useDispatch, useSelector } from "react-redux"
import { StateTypes } from "../redux/Store"

export default function Home(props) {
  const counter = useSelector((state: StateTypes) => state.counter)
  const dispatch = useDispatch()

  const clickHandler = (action: string) => {
    dispatch({
      type: action
    })
  }

  return (
    <div className="w-screen h-screen flex items-center justify-around">
      <div className="text-center">
        <h1 className="mb-3">ECommerce</h1>

        <div>
          <h3>Contador {counter.value}</h3>

          <div className="mt-6 font-bold">
            <button className="px-6 py-2 mx-3" onClick={() => clickHandler('COUNTER_DECREASE')}>-</button>
            <button className="px-6 py-2 mx-3" onClick={() => clickHandler('COUNTER_INCREASE')}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
