import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    const exists = cartItems.find(item => item._id === product._id)
    if (exists) {
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }])
    }
  }

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id))
  }

  const clearCart = () => setCartItems([])

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)