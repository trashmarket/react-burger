import { useEffect } from "react"
import {
  selectOrders,
  WS_CONNECTION_START_PRIVATE_ORDER,
  WS_CONNECTION_CLOSED
  } from './../services/actions/ws-action';
import { useSelector, useDispatch} from 'react-redux';
  
export function ProfileOrderPage() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({
      type: WS_CONNECTION_START_PRIVATE_ORDER
    })

    return () => {
      console.log('helloProfileClosed')

      dispatch({
        type: WS_CONNECTION_CLOSED
      })
    }
  },[])

  return (<h1>Hello</h1>)
}