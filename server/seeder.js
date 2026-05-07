const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const Product = require('./models/Product')
const User = require('./models/User')

const products = [
  // PHONES
  { name: 'iPhone 15 Pro Max', price: 134900, description: 'Latest Apple flagship with titanium design, A17 Pro chip, and 48MP camera system.', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', brand: 'Apple', category: 'Phones', countInStock: 15, rating: 4.8, numReviews: 245 },
  { name: 'Samsung Galaxy S24 Ultra', price: 124999, description: 'Samsung flagship with S Pen, 200MP camera, and Snapdragon 8 Gen 3.', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', brand: 'Samsung', category: 'Phones', countInStock: 20, rating: 4.7, numReviews: 189 },
  { name: 'OnePlus 12', price: 64999, description: 'Snapdragon 8 Gen 3, Hasselblad camera, 100W fast charging.', image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400', brand: 'OnePlus', category: 'Phones', countInStock: 25, rating: 4.6, numReviews: 312 },
  { name: 'Redmi Note 13 Pro+', price: 29999, description: '200MP camera, Dimensity 7200 Ultra, 120W HyperCharge.', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', brand: 'Xiaomi', category: 'Phones', countInStock: 40, rating: 4.4, numReviews: 890 },
  { name: 'Realme GT 5 Pro', price: 34999, description: 'Snapdragon 8 Gen 3, 144Hz AMOLED, 100W SuperVOOC charging.', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', brand: 'Realme', category: 'Phones', countInStock: 30, rating: 4.3, numReviews: 456 },
  { name: 'Vivo V30 Pro', price: 44999, description: 'ZEISS optics, 50MP portrait camera, 80W FlashCharge.', image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400', brand: 'Vivo', category: 'Phones', countInStock: 22, rating: 4.3, numReviews: 234 },
  { name: 'Google Pixel 8 Pro', price: 84999, description: 'Google Tensor G3, AI-powered photography, 7 years of updates.', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', brand: 'Google', category: 'Phones', countInStock: 18, rating: 4.6, numReviews: 178 },
  { name: 'iQOO 12', price: 52999, description: 'Snapdragon 8 Gen 3, Monster gaming performance, 144Hz E7 AMOLED.', image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400', brand: 'iQOO', category: 'Phones', countInStock: 28, rating: 4.5, numReviews: 345 },

  // LAPTOPS
  { name: 'MacBook Pro 16" M3 Pro', price: 249900, description: 'M3 Pro chip, Liquid Retina XDR display, 22hr battery life.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', brand: 'Apple', category: 'Laptops', countInStock: 8, rating: 4.9, numReviews: 312 },
  { name: 'MacBook Air M2', price: 114900, description: 'Fanless design, M2 chip, 18hr battery, 13.6" Liquid Retina.', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400', brand: 'Apple', category: 'Laptops', countInStock: 15, rating: 4.8, numReviews: 567 },
  { name: 'Dell XPS 15', price: 179900, description: 'OLED display, Intel Core i9, NVIDIA RTX 4070, premium build.', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400', brand: 'Dell', category: 'Laptops', countInStock: 10, rating: 4.6, numReviews: 143 },
  { name: 'ASUS ROG Zephyrus G14', price: 134999, description: 'AMD Ryzen 9, RTX 4060, 120Hz OLED display, gaming beast.', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400', brand: 'ASUS', category: 'Laptops', countInStock: 12, rating: 4.7, numReviews: 289 },
  { name: 'HP Spectre x360', price: 149999, description: '2-in-1 convertible, Intel Core i7, OLED touch display.', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', brand: 'HP', category: 'Laptops', countInStock: 9, rating: 4.5, numReviews: 198 },
  { name: 'Lenovo ThinkPad X1 Carbon', price: 139999, description: 'Ultra-light business laptop, Intel Core i7, 14" IPS display.', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400', brand: 'Lenovo', category: 'Laptops', countInStock: 7, rating: 4.6, numReviews: 167 },
  { name: 'Acer Predator Helios 16', price: 119999, description: 'Intel Core i9, RTX 4080, 240Hz Mini LED, top gaming laptop.', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', brand: 'Acer', category: 'Laptops', countInStock: 6, rating: 4.7, numReviews: 234 },

  // AUDIO
  { name: 'Sony WH-1000XM5', price: 29990, description: 'Industry-leading ANC, 30hr battery, multipoint connection.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', brand: 'Sony', category: 'Audio', countInStock: 30, rating: 4.8, numReviews: 567 },
  { name: 'AirPods Pro 2nd Gen', price: 24900, description: 'Active Noise Cancellation, Transparency mode, Spatial Audio.', image: 'https://images.unsplash.com/photo-1606741965574-a6a9caa6afd7?w=400', brand: 'Apple', category: 'Audio', countInStock: 50, rating: 4.8, numReviews: 892 },
  { name: 'Bose QuietComfort 45', price: 27990, description: 'World-class noise cancellation, 24hr battery, lightweight.', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400', brand: 'Bose', category: 'Audio', countInStock: 22, rating: 4.7, numReviews: 445 },
  { name: 'JBL Charge 5', price: 14999, description: 'Waterproof Bluetooth speaker, 20hr playtime, powerbank feature.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', brand: 'JBL', category: 'Audio', countInStock: 45, rating: 4.6, numReviews: 678 },
  { name: 'boAt Airdopes 141', price: 1299, description: 'TWS earbuds, 42hr total playtime, ENx noise cancellation.', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', brand: 'boAt', category: 'Audio', countInStock: 100, rating: 4.2, numReviews: 12345 },
  { name: 'Sony WF-1000XM5', price: 19990, description: 'Best-in-class ANC TWS earbuds, LDAC, 8hr battery.', image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400', brand: 'Sony', category: 'Audio', countInStock: 35, rating: 4.7, numReviews: 456 },

  // TABLETS
  { name: 'iPad Pro 12.9" M2', price: 112900, description: 'M2 chip, Liquid Retina XDR, Thunderbolt port, Apple Pencil.', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', brand: 'Apple', category: 'Tablets', countInStock: 12, rating: 4.7, numReviews: 201 },
  { name: 'Samsung Galaxy Tab S9+', price: 89999, description: 'AMOLED display, Snapdragon 8 Gen 2, S Pen included.', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400', brand: 'Samsung', category: 'Tablets', countInStock: 14, rating: 4.6, numReviews: 178 },
  { name: 'Xiaomi Pad 6', price: 26999, description: '11" 144Hz display, Snapdragon 870, 8600mAh battery.', image: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=400', brand: 'Xiaomi', category: 'Tablets', countInStock: 20, rating: 4.4, numReviews: 345 },

  // GAMING
  { name: 'PlayStation 5', price: 54990, description: 'Next-gen gaming, ultra-high speed SSD, DualSense controller.', image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400', brand: 'Sony', category: 'Gaming', countInStock: 5, rating: 4.9, numReviews: 1243 },
  { name: 'Xbox Series X', price: 52990, description: '12 teraflops GPU, 1TB SSD, 4K 120fps gaming.', image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400', brand: 'Microsoft', category: 'Gaming', countInStock: 7, rating: 4.8, numReviews: 876 },
  { name: 'Nintendo Switch OLED', price: 34999, description: '7-inch OLED screen, enhanced audio, 64GB storage.', image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400', brand: 'Nintendo', category: 'Gaming', countInStock: 25, rating: 4.7, numReviews: 934 },
  { name: 'Razer DeathAdder V3', price: 7999, description: 'Ultra-lightweight gaming mouse, 30K DPI optical sensor.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', brand: 'Razer', category: 'Gaming', countInStock: 40, rating: 4.6, numReviews: 567 },
  { name: 'Corsair K100 RGB Keyboard', price: 18999, description: 'Optical-mechanical switches, per-key RGB, aluminium frame.', image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400', brand: 'Corsair', category: 'Gaming', countInStock: 18, rating: 4.5, numReviews: 289 },

  // TVs
  { name: 'Samsung 65" 4K QLED', price: 129999, description: 'Neo QLED, Quantum Matrix, Dolby Atmos, 120Hz.', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400', brand: 'Samsung', category: 'TVs', countInStock: 6, rating: 4.7, numReviews: 134 },
  { name: 'LG OLED C3 55"', price: 139999, description: 'OLED evo, α9 AI Processor, Dolby Vision, 4K 120Hz.', image: 'https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=400', brand: 'LG', category: 'TVs', countInStock: 8, rating: 4.8, numReviews: 245 },
  { name: 'Sony Bravia XR 55"', price: 119999, description: 'Cognitive Processor XR, OLED panel, perfect for PS5.', image: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=400', brand: 'Sony', category: 'TVs', countInStock: 5, rating: 4.7, numReviews: 189 },
  { name: 'Mi TV 5X 55"', price: 34999, description: '4K QLED, Dolby Vision, Android TV, 30W speakers.', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400', brand: 'Xiaomi', category: 'TVs', countInStock: 20, rating: 4.4, numReviews: 2345 },

  // WEARABLES
  { name: 'Apple Watch Ultra 2', price: 89900, description: 'Titanium case, precision dual-frequency GPS, 60hr battery.', image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400', brand: 'Apple', category: 'Wearables', countInStock: 18, rating: 4.8, numReviews: 356 },
  { name: 'Apple Watch Series 9', price: 41900, description: 'S9 chip, Double Tap gesture, Always-On Retina display.', image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400', brand: 'Apple', category: 'Wearables', countInStock: 25, rating: 4.7, numReviews: 678 },
  { name: 'Samsung Galaxy Watch 6', price: 29999, description: 'Advanced health monitoring, BioActive sensor, Wear OS.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', brand: 'Samsung', category: 'Wearables', countInStock: 30, rating: 4.5, numReviews: 445 },
  { name: 'Noise ColorFit Ultra 3', price: 3499, description: 'AMOLED display, BT calling, SpO2, 7-day battery.', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400', brand: 'Noise', category: 'Wearables', countInStock: 80, rating: 4.2, numReviews: 8901 },
  { name: 'Fitbit Charge 6', price: 14999, description: 'Built-in GPS, heart rate, stress management, 7-day battery.', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400', brand: 'Fitbit', category: 'Wearables', countInStock: 35, rating: 4.4, numReviews: 567 },

  // CAMERAS
  { name: 'Canon EOS R6 Mark II', price: 249900, description: 'Full-frame mirrorless, 40fps burst, AI subject tracking.', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400', brand: 'Canon', category: 'Cameras', countInStock: 7, rating: 4.9, numReviews: 289 },
  { name: 'Sony Alpha A7 IV', price: 259990, description: '33MP BSI sensor, 4K 60fps video, real-time tracking.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', brand: 'Sony', category: 'Cameras', countInStock: 5, rating: 4.8, numReviews: 234 },
  { name: 'GoPro Hero 12 Black', price: 44990, description: 'HyperSmooth 6.0, 5.3K video, waterproof to 10m.', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400', brand: 'GoPro', category: 'Cameras', countInStock: 20, rating: 4.6, numReviews: 678 },

  // FASHION
  { name: "Levi's 511 Slim Jeans", price: 3499, description: 'Classic slim fit, stretch fabric, all-day comfort.', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', brand: 'Levis', category: 'Fashion', countInStock: 60, rating: 4.4, numReviews: 1567 },
  { name: 'Allen Solly Formal Shirt', price: 1299, description: 'Regular fit, 100% cotton, wrinkle-free finish.', image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400', brand: 'Allen Solly', category: 'Fashion', countInStock: 80, rating: 4.3, numReviews: 2345 },
  { name: 'Zara Oversized Blazer', price: 5990, description: 'Structured oversized fit, premium fabric, office to party.', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', brand: 'Zara', category: 'Fashion', countInStock: 35, rating: 4.5, numReviews: 456 },
  { name: 'H&M Graphic Tee', price: 799, description: 'Regular fit cotton tee, trendy graphic print.', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400', brand: 'H&M', category: 'Fashion', countInStock: 120, rating: 4.1, numReviews: 3456 },

  // SHOES
  { name: 'Nike Air Max 270', price: 12995, description: 'Inspired by Air Max 180 and 93, all-day comfort.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', brand: 'Nike', category: 'Shoes', countInStock: 40, rating: 4.5, numReviews: 678 },
  { name: 'Adidas Ultraboost 22', price: 16999, description: 'Boost midsole, Primeknit+ upper, incredible energy return.', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', brand: 'Adidas', category: 'Shoes', countInStock: 35, rating: 4.6, numReviews: 890 },
  { name: 'Puma RS-X', price: 8999, description: 'Retro-inspired running system silhouette, chunky sole.', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', brand: 'Puma', category: 'Shoes', countInStock: 45, rating: 4.3, numReviews: 567 },
  { name: 'Red Tape Formal Shoes', price: 2499, description: 'Genuine leather, cushioned insole, slip-resistant sole.', image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=400', brand: 'Red Tape', category: 'Shoes', countInStock: 55, rating: 4.2, numReviews: 1234 },

  // HOME & KITCHEN
  { name: 'Dyson V15 Detect', price: 52900, description: 'Laser dust detection, HEPA filtration, 60min runtime.', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400', brand: 'Dyson', category: 'Home', countInStock: 22, rating: 4.6, numReviews: 445 },
  { name: 'Philips Air Fryer XXL', price: 11995, description: '7.3L capacity, Rapid Air technology, 90% less fat.', image: 'https://images.unsplash.com/photo-1648783559958-4f5bfaaa7b9e?w=400', brand: 'Philips', category: 'Kitchen', countInStock: 28, rating: 4.5, numReviews: 2341 },
  { name: 'Instant Pot Duo 7-in-1', price: 8999, description: 'Pressure cooker, slow cooker, rice cooker — all in one.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', brand: 'Instant Pot', category: 'Kitchen', countInStock: 35, rating: 4.7, numReviews: 3456 },
  { name: 'Nespresso Vertuo Next', price: 14999, description: 'Centrifusion technology, 5 cup sizes, 11 color options.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', brand: 'Nespresso', category: 'Kitchen', countInStock: 18, rating: 4.6, numReviews: 789 },
  { name: 'Havells Ceiling Fan', price: 3499, description: 'BLDC motor, energy saving, remote control, 5-star rating.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', brand: 'Havells', category: 'Home', countInStock: 40, rating: 4.3, numReviews: 1890 }
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')
    await Product.deleteMany({})
    console.log('Old products cleared')
    const adminUser = await User.findOne({ isAdmin: true })
    if (!adminUser) {
      console.log('No admin user found! Make sure you have an admin user.')
      process.exit(1)
    }
    const productsWithUser = products.map(p => ({ ...p, user: adminUser._id }))
    await Product.insertMany(productsWithUser)
    console.log(`✅ ${products.length} Products seeded successfully!`)
    process.exit()
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

seedDB()
