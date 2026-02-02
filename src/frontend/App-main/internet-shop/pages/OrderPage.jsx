import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../components/components-internetShop/axios-shopUser'
import styles from './Pages.module.scss'

export const OrderPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(s => s.authUserShopState.user)
  const cart = user?.cart || []

  const [seconds, setSeconds] = useState(5)
  const created = useRef(false)

  // 🔹 Создание заказа
  useEffect(() => {
    if (!user || !cart.length || created.current) return
    created.current = true

    const createOrder = async () => {
      try {
        const { data: order } = await api.post('/orders')

        // обновляем пользователя в redux
        dispatch({
          type: 'AUTH_UPDATE_USER',
          payload: {
            cart: [],
            orders: [...(user.orders || []), order._id]
          }
        })

        // обновляем storage
        const updatedUser = {
          ...user,
          cart: [],
          orders: [...(user.orders || []), order._id]
        }

        if (localStorage.getItem('authUser')) {
          localStorage.setItem('authUser', JSON.stringify(updatedUser))
        } else if (sessionStorage.getItem('authUser')) {
          sessionStorage.setItem('authUser', JSON.stringify(updatedUser))
        }
      } catch (e) {
        console.error('Order error', e)
        navigate('/shop')
      }
    }

    createOrder()
  }, [user, cart, dispatch, navigate])

  // 🔹 Таймер возврата
  useEffect(() => {
    if (seconds <= 0) {
      navigate('/shop')
      return
    }

    const t = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds, navigate])

  return (
    <div className={styles.page}>
      <h2>📦 Заказ оформлен</h2>
      <p>Возврат в магазин через {seconds} сек</p>
    </div>
  )
}
