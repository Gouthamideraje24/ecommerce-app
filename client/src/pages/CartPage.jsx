import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const { cartItems, removeFromCart, totalPrice, totalItems } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) return (
    <div style={{ paddingTop: 'var(--nav-height)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', gap: '1.5rem', animation: 'fadeIn 0.4s ease' }}>
      <div style={{ fontSize: '5rem' }}>🛒</div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem' }}>Your cart is empty</h2>
      <p style={{ color: '#888' }}>Looks like you haven't added anything yet</p>
      <button onClick={() => navigate('/')} style={{ background: '#FF4D00', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '50px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Start Shopping</button>
    </div>
  )

  const shipping = totalPrice > 50 ? 0 : 9.99
  const tax = +(totalPrice * 0.08).toFixed(2)
  const grandTotal = +(totalPrice + shipping + tax).toFixed(2)

  return (
    <div style={{ paddingTop: 'var(--nav-height)', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>

        {/* Cart Items */}
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', marginBottom: '1.5rem' }}>
            Shopping Cart <span style={{ color: '#888', fontSize: '1.2rem', fontWeight: 400 }}>({totalItems} items)</span>
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map((item, i) => (
              <div key={item._id} style={{ background: 'white', borderRadius: '16px', padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', animation: `fadeUp 0.3s ease ${i * 0.05}s both` }}>
                <img
                  src={item.image} alt={item.name}
                  style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '12px', background: '#f8f8f8' }}
                  onError={e => e.target.src = 'https://via.placeholder.com/90?text=IMG'}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.8rem', color: '#FF4D00', fontWeight: 600, marginBottom: '4px' }}>{item.brand}</p>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', marginBottom: '6px' }}>{item.name}</h3>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>${item.price} <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 400 }}>× {item.qty}</span></p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>${(item.price * item.qty).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item._id)} style={{ background: '#fff0f0', color: '#e53e3e', border: 'none', padding: '6px 14px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '1.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'sticky', top: '90px' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', marginBottom: '1.5rem' }}>Order Summary</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
            {[['Subtotal', `$${totalPrice.toFixed(2)}`], ['Shipping', shipping === 0 ? 'FREE 🎉' : `$${shipping}`], ['Tax (8%)', `$${tax}`]].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#555' }}>
                <span>{label}</span>
                <span style={{ fontWeight: 500, color: value === 'FREE 🎉' ? '#00A651' : 'inherit' }}>{value}</span>
              </div>
            ))}
            <div style={{ height: '1px', background: '#f0f0f0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700 }}>
              <span>Total</span>
              <span style={{ color: '#FF4D00' }}>${grandTotal}</span>
            </div>
          </div>

          {shipping > 0 && <div style={{ background: '#fff8e1', borderRadius: '8px', padding: '10px 14px', fontSize: '0.8rem', color: '#856404', marginBottom: '1rem' }}>Add ${(50 - totalPrice).toFixed(2)} more for FREE shipping!</div>}

          <button onClick={() => navigate('/checkout')} style={{
            width: '100%', padding: '15px', background: '#FF4D00', color: 'white',
            border: 'none', borderRadius: '50px', fontSize: '1rem', fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(255,77,0,0.35)'
          }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >Proceed to Checkout →</button>

          <button onClick={() => navigate('/')} style={{ width: '100%', padding: '12px', background: 'transparent', color: '#555', border: '1px solid #e0e0e0', borderRadius: '50px', fontSize: '0.9rem', cursor: 'pointer', marginTop: '10px' }}>Continue Shopping</button>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {['🔒 Secure', '↩️ Easy Returns', '⚡ Fast Delivery'].map(tag => (
              <span key={tag} style={{ fontSize: '0.75rem', color: '#888' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage