import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const statusSteps = ['Order Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered']

const getStatusIndex = (order) => {
  if (order.isDelivered) return 4
  if (order.isPaid) return 2
  return 1
}

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false)
  const statusIndex = getStatusIndex(order)

  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '1rem', animation: 'fadeUp 0.3s ease' }}>

      {/* Order Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Order ID</p>
          <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#333' }}>{order._id}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Order Date</p>
          <p style={{ fontSize: '0.85rem' }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Total Amount</p>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#FF4D00' }}>₹{order.totalPrice.toLocaleString('en-IN')}</p>
        </div>
        <div style={{
          background: order.isDelivered ? '#f0fff4' : '#fff8e1',
          color: order.isDelivered ? '#00A651' : '#856404',
          padding: '6px 14px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600
        }}>
          {order.isDelivered ? '✅ Delivered' : '🚚 In Progress'}
        </div>
      </div>

      {/* Status Tracker */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.8rem', color: '#FF4D00', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem' }}>Order Status</p>
        <div style={{ position: 'relative' }}>
          {/* Progress Line */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', height: '3px', background: '#f0f0f0', zIndex: 0 }} />
          <div style={{ position: 'absolute', top: '16px', left: '16px', height: '3px', background: '#FF4D00', zIndex: 1, width: `${(statusIndex / (statusSteps.length - 1)) * (100 - (32 / 5))}%`, transition: 'width 0.5s ease' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
            {statusSteps.map((step, i) => (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: i <= statusIndex ? '#FF4D00' : '#f0f0f0',
                  color: i <= statusIndex ? 'white' : '#ccc',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 700, transition: 'all 0.3s',
                  boxShadow: i === statusIndex ? '0 0 0 4px rgba(255,77,0,0.2)' : 'none'
                }}>
                  {i < statusIndex ? '✓' : i === statusIndex ? '●' : '○'}
                </div>
                <p style={{ fontSize: '10px', textAlign: 'center', color: i <= statusIndex ? '#FF4D00' : '#aaa', fontWeight: i === statusIndex ? 700 : 400, lineHeight: 1.2 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ background: order.isPaid ? '#f0fff4' : '#fff0f0', color: order.isPaid ? '#00A651' : '#e53e3e', padding: '6px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>
          {order.isPaid ? '💳 Payment Done' : '💵 Pay on Delivery'}
        </div>
        <div style={{ background: '#f8f8f8', padding: '6px 12px', borderRadius: '50px', fontSize: '0.8rem', color: '#555' }}>
          📦 {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Toggle Items */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ background: 'none', border: '1px solid #e0e0e0', padding: '8px 16px', borderRadius: '50px', fontSize: '0.85rem', cursor: 'pointer', color: '#555', transition: 'all 0.2s' }}
      >{expanded ? '▲ Hide Items' : '▼ View Items'}</button>

      {/* Items List */}
      {expanded && (
        <div style={{ marginTop: '1rem', animation: 'fadeIn 0.3s ease' }}>
          {order.orderItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
              <img src={item.image} alt={item.name} style={{ width: '55px', height: '55px', objectFit: 'cover', borderRadius: '8px', background: '#f8f8f8' }} onError={e => e.target.src = 'https://via.placeholder.com/55'} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '2px' }}>{item.name}</p>
                <p style={{ color: '#888', fontSize: '0.8rem' }}>Qty: {item.qty}</p>
              </div>
              <p style={{ fontWeight: 600 }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
            </div>
          ))}

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div style={{ marginTop: '1rem', background: '#f8f8f8', borderRadius: '10px', padding: '1rem' }}>
              <p style={{ fontSize: '0.8rem', color: '#FF4D00', fontWeight: 600, marginBottom: '6px' }}>📍 DELIVERY ADDRESS</p>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders')
        setOrders(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  if (loading) return (
    <div style={{ paddingTop: 'var(--nav-height)', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ width: '48px', height: '48px', border: '4px solid #f0f0f0', borderTopColor: '#FF4D00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  return (
    <div style={{ paddingTop: 'var(--nav-height)', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#FF4D00', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>MY ACCOUNT</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem' }}>My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '20px' }}>
            <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', marginBottom: '0.5rem' }}>No orders yet</h2>
            <p style={{ color: '#888', marginBottom: '1.5rem' }}>Looks like you haven't placed any orders</p>
            <button onClick={() => navigate('/')} style={{ background: '#FF4D00', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}>Start Shopping</button>
          </div>
        ) : (
          <>
            <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{orders.length} order{orders.length > 1 ? 's' : ''} found</p>
            {orders.map(order => <OrderCard key={order._id} order={order} />)}
          </>
        )}
      </div>
    </div>
  )
}

export default OrdersPage