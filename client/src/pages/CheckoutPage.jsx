import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    address: '', city: '', postalCode: '', country: 'India'
  })
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  const shipping = totalPrice > 5000 ? 0 : 99
  const tax = +(totalPrice * 0.08).toFixed(2)
  const grandTotal = +(totalPrice + shipping + tax).toFixed(2)

  const handlePlaceOrder = async () => {
    if (!user) { navigate('/login'); return }
    setLoading(true)
    try {
      const { data } = await api.post('/orders', {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        shippingAddress: address,
        paymentMethod,
        itemsPrice: totalPrice,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: grandTotal
      })
      setOrderId(data._id)
      setOrderPlaced(true)
      clearCart()
    } catch (err) {
      alert('Order failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (orderPlaced) return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', background: 'var(--bg)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', maxWidth: '500px', width: '90%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', animation: 'fadeUp 0.5s ease' }}>
        <div style={{ width: '80px', height: '80px', background: '#f0fff4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem' }}>✅</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Order Placed!</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>Your order has been successfully placed.</p>
        <div style={{ background: '#f8f8f8', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '4px' }}>Order ID</p>
          <p style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#333', wordBreak: 'break-all' }}>{orderId}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => navigate('/orders')} style={{ background: '#FF4D00', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}>Track Order</button>
          <button onClick={() => navigate('/')} style={{ background: '#f0f0f0', color: '#333', border: 'none', padding: '12px 24px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}>Continue Shopping</button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', marginBottom: '2rem' }}>Checkout</h1>

        {/* Steps */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem', gap: '0' }}>
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => i + 1 < step && setStep(i + 1)}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: step > i + 1 ? '#00A651' : step === i + 1 ? '#FF4D00' : '#e0e0e0',
                  color: step >= i + 1 ? 'white' : '#888', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0
                }}>{step > i + 1 ? '✓' : i + 1}</div>
                <span style={{ fontSize: '0.9rem', fontWeight: step === i + 1 ? 600 : 400, color: step === i + 1 ? '#FF4D00' : '#666' }}>{s}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: '2px', background: step > i + 1 ? '#00A651' : '#e0e0e0', margin: '0 8px' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }}>

          {/* Left - Steps */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

            {/* Step 1 - Shipping */}
            {step === 1 && (
              <div style={{ animation: 'fadeUp 0.3s ease' }}>
                <h2 style={{ fontFamily: 'Syne, sans-serif', marginBottom: '1.5rem' }}>Shipping Address</h2>
                {[
                  { label: 'Full Address', key: 'address', placeholder: 'House no, Street, Area' },
                  { label: 'City', key: 'city', placeholder: 'City' },
                  { label: 'Postal Code', key: 'postalCode', placeholder: '560001' },
                  { label: 'Country', key: 'country', placeholder: 'India' }
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#555' }}>{field.label}</label>
                    <input
                      type='text'
                      placeholder={field.placeholder}
                      value={address[field.key]}
                      onChange={e => setAddress({ ...address, [field.key]: e.target.value })}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '0.95rem', outline: 'none', transition: 'border 0.2s' }}
                      onFocus={e => e.target.style.borderColor = '#FF4D00'}
                      onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                ))}
                <button
                  onClick={() => { if (Object.values(address).every(v => v)) setStep(2); else alert('Please fill all fields') }}
                  style={{ width: '100%', padding: '14px', background: '#FF4D00', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginTop: '1rem' }}
                >Continue to Payment →</button>
              </div>
            )}

            {/* Step 2 - Payment */}
            {step === 2 && (
              <div style={{ animation: 'fadeUp 0.3s ease' }}>
                <h2 style={{ fontFamily: 'Syne, sans-serif', marginBottom: '1.5rem' }}>Payment Method</h2>
                {[
                  { value: 'COD', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
                  { value: 'UPI', label: 'UPI Payment', icon: '📱', desc: 'GPay, PhonePe, Paytm' },
                  { value: 'Card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, Rupay' },
                  { value: 'NetBanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' }
                ].map(method => (
                  <div
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px',
                      border: `2px solid ${paymentMethod === method.value ? '#FF4D00' : '#e0e0e0'}`,
                      background: paymentMethod === method.value ? '#fff5f2' : 'white',
                      marginBottom: '1rem', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '1.8rem' }}>{method.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, marginBottom: '2px' }}>{method.label}</p>
                      <p style={{ fontSize: '0.8rem', color: '#888' }}>{method.desc}</p>
                    </div>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: `2px solid ${paymentMethod === method.value ? '#FF4D00' : '#ccc'}`,
                      background: paymentMethod === method.value ? '#FF4D00' : 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {paymentMethod === method.value && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />}
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: '14px', background: '#f0f0f0', color: '#333', border: 'none', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}>← Back</button>
                  <button onClick={() => setStep(3)} style={{ flex: 2, padding: '14px', background: '#FF4D00', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}>Review Order →</button>
                </div>
              </div>
            )}

            {/* Step 3 - Review */}
            {step === 3 && (
              <div style={{ animation: 'fadeUp 0.3s ease' }}>
                <h2 style={{ fontFamily: 'Syne, sans-serif', marginBottom: '1.5rem' }}>Review Order</h2>

                <div style={{ background: '#f8f8f8', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.8rem', color: '#FF4D00', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>Shipping To</p>
                  <p style={{ fontWeight: 500 }}>{address.address}, {address.city}</p>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>{address.postalCode}, {address.country}</p>
                </div>

                <div style={{ background: '#f8f8f8', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.8rem', color: '#FF4D00', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>Payment</p>
                  <p style={{ fontWeight: 500 }}>{paymentMethod === 'COD' ? '💵 Cash on Delivery' : paymentMethod === 'UPI' ? '📱 UPI Payment' : paymentMethod === 'Card' ? '💳 Card Payment' : '🏦 Net Banking'}</p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.8rem', color: '#FF4D00', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>Items ({cartItems.length})</p>
                  {cartItems.map(item => (
                    <div key={item._id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} onError={e => e.target.src = 'https://via.placeholder.com/50'} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</p>
                        <p style={{ fontSize: '0.8rem', color: '#888' }}>Qty: {item.qty}</p>
                      </div>
                      <p style={{ fontWeight: 600 }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setStep(2)} style={{ flex: 1, padding: '14px', background: '#f0f0f0', color: '#333', border: 'none', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}>← Back</button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    style={{ flex: 2, padding: '14px', background: loading ? '#ccc' : '#FF4D00', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem' }}
                  >{loading ? 'Placing Order...' : '✅ Place Order'}</button>
                </div>
              </div>
            )}
          </div>

          {/* Right - Order Summary */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', marginBottom: '1rem' }}>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                <span style={{ color: '#555' }}>{item.name} × {item.qty}</span>
                <span style={{ fontWeight: 500 }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div style={{ height: '1px', background: '#f0f0f0', margin: '1rem 0' }} />
            {[['Subtotal', `₹${totalPrice.toLocaleString('en-IN')}`], ['Shipping', shipping === 0 ? 'FREE 🎉' : `₹${shipping}`], ['Tax (8%)', `₹${tax}`]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: '#555' }}>
                <span>{l}</span><span style={{ color: v === 'FREE 🎉' ? '#00A651' : 'inherit' }}>{v}</span>
              </div>
            ))}
            <div style={{ height: '1px', background: '#f0f0f0', margin: '1rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
              <span>Total</span>
              <span style={{ color: '#FF4D00' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage