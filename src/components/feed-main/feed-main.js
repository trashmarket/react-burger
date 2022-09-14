import styles from './feed-main.module.css';
import { useSelector, useDispatch} from 'react-redux';
import {
  selectOrders,
  WS_CONNECTION_START_ALL_ORDER,
  WS_CONNECTION_CLOSED
  } from '../../services/actions/ws-action';
import { 
  useEffect
 } from 'react';

export default function FeedMain() {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START_ALL_ORDER
    })
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED
      })
    }
  }, [dispatch])

  return (
    <main className={styles.main}>
      <h1 className='text text_type_main-large mt-10'>Лента заказов</h1>
    </main>
  )
}