import styles from './feed-main.module.css';
import { useSelector, useDispatch} from 'react-redux';
import {
  selectOrders,
  WS_CONNECTION_START_ALL,
  WS_CLOSE
  } from '../../services/actions/ws-action';
import { selectCart } from '../../services/actions/cart'
import { 
  useEffect
 } from 'react';
import  OrdersList  from '../orders-list/orders-list';
import Modal from "../modal/modal";
import { OrderFullCard } from '../order-full-card/order-full-card';
import { useHistory } from 'react-router-dom';
import { checkHistory } from '../../utils/utils'

export default function FeedMain({setUseModalState, ingredient, onClose}) {
  const { orders, total, totalToday }  = useSelector(selectOrders);
  const { items } = useSelector(selectCart);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(()=>{
    checkHistory(history);
  }, [])

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START_ALL
    })
    return () => {
      dispatch({
        type: WS_CLOSE
      })
    }
  }, [dispatch])
  
  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large mt-10">Лента заказов</h1>
      <section className={styles.section}>
        <div className={styles.ordersWrapper}>
          <OrdersList orders={orders} itemsCart={items} setUseModalState={setUseModalState}/>
        </div>
        <div className={styles.generalInformation}>
          <div className={styles.generalInformationWraperList}>
            <div>
              <h3 className="text text_type_main-medium">Готовы:</h3>
              <ul>
                {orders
                  .filter(({ status }) => status === "done")
                  .splice(0, 5)
                  .map(({ number }) => (
                    <li className={`${styles.generalInformationWraperItem} text text_type_digits-default`} key={number}>{number}</li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="text text_type_main-medium">В работе:</h3>
              <ul>
                {orders.filter(({ status }) => status !== "done").splice(0, 5).map(({ number }) => (
                    <li className={`${styles.generalInformationWraperItem} text text_type_digits-default`} key={number}>{number ? number : 'not status'}</li>
                  ))}
              </ul>
            </div>
          </div>
            <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
            <p className={`${styles.totalPrice} text text_type_digits-large`}>
              {total}
            </p>
            <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
            <p className={`${styles.totalPrice} text text_type_digits-large`}>{totalToday}</p>
        </div>
        {ingredient && (
        <Modal onClose={onClose}>
          <OrderFullCard ingredient={ingredient}/>
        </Modal>
        )}
      </section>
    </main>
  );
}