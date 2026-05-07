import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', { email, password })
      login(data)
      navigate('/')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        <input style={styles.input} type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        <button style={styles.btn} onClick={handleSubmit}>Login</button>
        <p style={styles.text}>No account? <Link to='/register'>Register</Link></p>
      </div>
    </div>
  )
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'80vh' },
  box: { background:'white', padding:'2rem', borderRadius:'8px', boxShadow:'0 2px 12px rgba(0,0,0,0.1)', width:'100%', maxWidth:'400px', display:'flex', flexDirection:'column', gap:'1rem' },
  title: { textAlign:'center', margin:'0 0 1rem' },
  input: { padding:'10px', borderRadius:'4px', border:'1px solid #ddd', fontSize:'1rem' },
  btn: { padding:'10px', background:'#1a1a2e', color:'white', border:'none', borderRadius:'4px', fontSize:'1rem', cursor:'pointer' },
  error: { color:'red', textAlign:'center' },
  text: { textAlign:'center' }
}

export default LoginPage