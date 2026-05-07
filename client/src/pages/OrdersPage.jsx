import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    const fetchOrders = async () => {
      const { data } = await api.get('/orders/myorders')
      setOrders(data)
    }
    fetchOrders()
  }, [user])

  return (
    <div style={styles.container}>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={styles.card}>
            <p>Order ID: {order._id}</p>
            <p>Total: ${order.totalPrice}</p>
            <p>Paid: {order.isPaid ? '✅ Yes' : '❌ No'}</p>
            <p>Delivered: {order.isDelivered ? '✅ Yes' : '❌ No'}</p>
          </div>
        ))
      )}
    </div>
  )
}

const styles = {
  container: { padding:'2rem', maxWidth:'800px', margin:'0 auto' },
  card: { border:'1px solid #ddd', borderRadius:'8px', padding:'1rem', marginBottom:'1rem' }
}

export default OrdersPage