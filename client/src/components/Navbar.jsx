import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(10,10,10,0.97)' : '#0A0A0A',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      transition: 'all 0.3s ease',
      height: 'var(--nav-height)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', height: '100%', display: 'flex', alignItems: 'center', gap: '2rem' }}>

        {/* Logo */}
        <Link to='/' style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.6rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px', flexShrink: 0 }}>
          SHOP<span style={{ color: '#FF4D00' }}>NOW</span>
        </Link>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: '500px', position: 'relative' }}>
          <input
            type='text'
            placeholder='Search products, brands...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '10px 16px 10px 42px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '50px', color: 'white',
              fontSize: '0.9rem', outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = '#FF4D00'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
          />
          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem' }}>🔍</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: 'auto' }}>
          <Link to='/cart' style={{ position: 'relative', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🛒</span>
            <span>Cart</span>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-12px',
                background: '#FF4D00', color: 'white', borderRadius: '50%',
                width: '18px', height: '18px', fontSize: '11px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, animation: 'pulse 1s ease infinite'
              }}>{totalItems}</span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to='/orders' style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Orders</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF4D00, #FFD100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: '0.85rem'
                }}>{user.name[0].toUpperCase()}</div>
                <span style={{ color: 'white', fontSize: '0.9rem' }}>{user.name.split(' ')[0]}</span>
              </div>
              <button onClick={handleLogout} style={{
                background: 'transparent', border: '1px solid rgba(255,77,0,0.5)',
                color: '#FF4D00', padding: '6px 14px', borderRadius: '50px',
                fontSize: '0.85rem', transition: 'all 0.2s'
              }}
                onMouseEnter={e => { e.target.style.background = '#FF4D00'; e.target.style.color = 'white' }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#FF4D00' }}
              >Logout</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to='/login' style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', padding: '6px 14px' }}>Login</Link>
              <Link to='/register' style={{
                background: '#FF4D00', color: 'white', padding: '8px 18px',
                borderRadius: '50px', fontSize: '0.9rem', fontWeight: 500,
                transition: 'all 0.2s'
              }}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar