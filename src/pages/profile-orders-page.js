import { useEffect } from "react"
import {
  selectOrders,
  WS_CONNECTION_START_PRIVET,
  WS_CLOSE
  } from './../services/actions/ws-action';
import { useSelector, useDispatch} from 'react-redux';
  
export function ProfileOrderPage() {
  const dispatch = useDispatch();
  const { orders } = useSelector(selectOrders);

  useEffect(()=>{
    dispatch({
      type: WS_CONNECTION_START_PRIVET
    })

    return () => {
      console.log('helloProfileClosed')

      dispatch({
        type: WS_CLOSE
      })
    }
  },[])

  return (<h1>Hello</h1>)
}