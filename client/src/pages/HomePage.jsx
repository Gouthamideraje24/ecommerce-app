import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const categories = ['All', 'Phones', 'Laptops', 'Audio', 'Gaming', 'Tablets', 'TVs', 'Wearables', 'Cameras', 'Fashion', 'Home', 'Kitchen', 'Shoes']

const StarRating = ({ rating }) => {
  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      {[1,2,3,4,5].map(star => (
        <span key={star} style={{ fontSize: '12px', color: star <= Math.round(rating) ? '#FFD100' : '#ddd' }}>★</span>
      ))}
      <span style={{ fontSize: '11px', color: '#888', marginLeft: '4px' }}>{rating}</span>
    </div>
  )
}

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  const discount = Math.floor(Math.random() * 30) + 10
  const originalPrice = Math.round(product.price * (100 / (100 - discount)))

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.15)' : '0 2px 12px rgba(0,0,0,0.06)',
        animation: `fadeUp 0.5s ease ${index * 0.05}s both`,
        border: '1px solid #f0f0f0',
        position: 'relative'
      }}
    >
      {/* Badge */}
      <div style={{
        position: 'absolute', top: '12px', left: '12px', zIndex: 2,
        background: '#FF4D00', color: 'white', padding: '3px 8px',
        borderRadius: '50px', fontSize: '11px', fontWeight: 700
      }}>{discount}% OFF</div>

      {/* Wishlist */}
      <div style={{
        position: 'absolute', top: '12px', right: '12px', zIndex: 2,
        background: 'white', borderRadius: '50%', width: '32px', height: '32px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: '14px',
        transition: 'all 0.2s', transform: hovered ? 'scale(1.1)' : 'scale(1)'
      }}>♡</div>

      {/* Image */}
      <div style={{ height: '200px', overflow: 'hidden', background: '#f8f8f8' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)'
          }}
          onError={e => e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 16px' }}>
        <p style={{ fontSize: '11px', color: '#FF4D00', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{product.brand}</p>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', lineHeight: 1.3, fontFamily: 'Syne, sans-serif' }}>{product.name}</h3>
        <StarRating rating={product.rating} />
        <p style={{ fontSize: '11px', color: '#999', marginBottom: '10px' }}>{product.numReviews} reviews</p>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0A0A0A' }}>${product.price}</span>
          <span style={{ fontSize: '0.85rem', color: '#bbb', textDecoration: 'line-through' }}>${originalPrice}</span>
        </div>

        <div style={{
          background: product.countInStock > 0 ? '#f0fff4' : '#fff0f0',
          color: product.countInStock > 0 ? '#00A651' : '#e53e3e',
          padding: '4px 10px', borderRadius: '50px',
          fontSize: '11px', fontWeight: 600, display: 'inline-block'
        }}>
          {product.countInStock > 0 ? `✓ In Stock (${product.countInStock})` : '✗ Out of Stock'}
        </div>
      </div>
    </div>
  )
}

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products')
        setProducts(data)
        setFiltered(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    let result = activeCategory === 'All' ? [...products] : products.filter(p => p.category === activeCategory)
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    setFiltered(result)
  }, [activeCategory, sortBy, products])

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ width: '48px', height: '48px', border: '4px solid #f0f0f0', borderTopColor: '#FF4D00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: '#888' }}>Loading products...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1a0a00 50%, #0A0A0A 100%)',
        padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,77,0,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,209,0,0.1) 0%, transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1, animation: 'fadeUp 0.6s ease' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,77,0,0.15)', border: '1px solid rgba(255,77,0,0.3)', color: '#FF4D00', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '0.5px' }}>
            🔥 MEGA SALE — UP TO 50% OFF
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Everything You<br /><span style={{ color: '#FF4D00' }}>Love</span>, Delivered Fast
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Discover the latest products from top brands at unbeatable prices.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })} style={{
              background: '#FF4D00', color: 'white', border: 'none', padding: '14px 32px',
              borderRadius: '50px', fontSize: '1rem', fontWeight: 600, transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(255,77,0,0.4)'
            }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            >Shop Now →</button>
            <button style={{
              background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)',
              padding: '14px 32px', borderRadius: '50px', fontSize: '1rem', transition: 'all 0.2s'
            }}
              onMouseEnter={e => e.target.style.borderColor = 'white'}
              onMouseLeave={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
            >View Deals</button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: '#FF4D00', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {[['🚚', 'Free Shipping', 'On orders over $50'], ['🔄', 'Easy Returns', '30-day return policy'], ['🔒', 'Secure Payment', '100% protected'], ['⭐', '4.8 Rating', '10,000+ reviews']].map(([icon, title, sub]) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
              <span style={{ fontSize: '1.5rem' }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{title}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div id='products' style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ color: '#FF4D00', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>EXPLORE</p>
            <h2 style={{ fontSize: '2rem', fontFamily: 'Syne, sans-serif' }}>All Products</h2>
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '50px', border: '1px solid #e0e0e0', background: 'white', fontSize: '0.9rem', cursor: 'pointer', outline: 'none' }}
          >
            <option value='default'>Sort: Featured</option>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
            <option value='rating'>Top Rated</option>
          </select>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2.5rem', overflowX: 'auto', paddingBottom: '8px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '8px 18px', borderRadius: '50px', border: '1px solid',
              borderColor: activeCategory === cat ? '#FF4D00' : '#e0e0e0',
              background: activeCategory === cat ? '#FF4D00' : 'white',
              color: activeCategory === cat ? 'white' : '#555',
              fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer',
              whiteSpace: 'nowrap', transition: 'all 0.2s',
              transform: activeCategory === cat ? 'scale(1.02)' : 'scale(1)'
            }}>{cat}</button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Showing <strong>{filtered.length}</strong> products
          {activeCategory !== 'All' && <span> in <strong>{activeCategory}</strong></span>}
        </p>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#888' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
            <p style={{ fontSize: '1.2rem' }}>No products in this category yet</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: '#0A0A0A', color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: '2rem', marginTop: '3rem', fontSize: '0.85rem' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}>SHOP<span style={{ color: '#FF4D00' }}>NOW</span></p>
        <p>© 2026 ShopNow. Built with MERN Stack 🚀</p>
      </footer>
    </div>
  )
}

export default HomePage