import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../services/api'

const StarRating = ({ rating }) => (
  <div style={{ display: 'flex', gap: '3px' }}>
    {[1,2,3,4,5].map(star => (
      <span key={star} style={{ fontSize: '18px', color: star <= Math.round(rating) ? '#FFD100' : '#ddd' }}>★</span>
    ))}
  </div>
)

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/products/${id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!product) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ width: '48px', height: '48px', border: '4px solid #f0f0f0', borderTopColor: '#FF4D00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  const discount = Math.floor(Math.random() * 30) + 10
  const originalPrice = Math.round(product.price * (100 / (100 - discount)))

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '2rem', fontSize: '0.85rem', color: '#888' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#FF4D00' }}>Home</span>
          <span>›</span>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>{product.category}</span>
          <span>›</span>
          <span>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Image */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', background: 'white', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', aspectRatio: '1' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                onError={e => e.target.src = 'https://via.placeholder.com/500?text=No+Image'}
                onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
          </div>

          {/* Details */}
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{ display: 'inline-block', background: '#fff0eb', color: '#FF4D00', padding: '4px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>{product.brand}</div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>{product.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <StarRating rating={product.rating} />
              <span style={{ color: '#888', fontSize: '0.9rem' }}>{product.numReviews} reviews</span>
            </div>

            {/* Price */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0A0A0A' }}>${product.price}</span>
                <span style={{ fontSize: '1.1rem', color: '#bbb', textDecoration: 'line-through' }}>${originalPrice}</span>
                <span style={{ background: '#FF4D00', color: 'white', padding: '3px 10px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700 }}>{discount}% OFF</span>
              </div>
              <p style={{ color: '#00A651', fontSize: '0.9rem', fontWeight: 600 }}>You save ${originalPrice - product.price}!</p>
            </div>

            <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{product.description}</p>

            {/* Stock */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ background: product.countInStock > 0 ? '#f0fff4' : '#fff0f0', color: product.countInStock > 0 ? '#00A651' : '#e53e3e', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                {product.countInStock > 0 ? `✓ In Stock — ${product.countInStock} left` : '✗ Out of Stock'}
              </div>
              <div style={{ background: '#f8f8f8', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem', color: '#555' }}>
                📦 Free Delivery
              </div>
            </div>

            {/* Qty + Add to Cart */}
            {product.countInStock > 0 && (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: '50px', overflow: 'hidden', background: 'white' }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: '40px', height: '44px', border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer' }}>−</button>
                  <span style={{ width: '40px', textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.countInStock, q + 1))} style={{ width: '40px', height: '44px', border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
                </div>
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1, padding: '14px 28px',
                    background: added ? '#00A651' : '#FF4D00',
                    color: 'white', border: 'none', borderRadius: '50px',
                    fontSize: '1rem', fontWeight: 600, transition: 'all 0.3s',
                    boxShadow: added ? '0 4px 20px rgba(0,166,81,0.4)' : '0 4px 20px rgba(255,77,0,0.4)'
                  }}
                  onMouseEnter={e => !added && (e.target.style.transform = 'scale(1.02)')}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                >
                  {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                </button>
              </div>
            )}

            <button
              onClick={() => { handleAddToCart(); navigate('/cart') }}
              style={{
                width: '100%', padding: '14px', background: '#0A0A0A', color: 'white',
                border: 'none', borderRadius: '50px', fontSize: '1rem', fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.target.style.background = '#333'}
              onMouseLeave={e => e.target.style.background = '#0A0A0A'}
            >Buy Now</button>

            {/* Tags */}
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Free Returns', '1 Year Warranty', 'Genuine Product'].map(tag => (
                <span key={tag} style={{ background: '#f5f5f0', padding: '5px 12px', borderRadius: '50px', fontSize: '0.8rem', color: '#555' }}>✓ {tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage