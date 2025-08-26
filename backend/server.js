// server.js
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'

// Load .env into process.env
dotenv.config()

// __dirname shim for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const PORT = process.env.PORT || 3001
const DIST_DIR = path.join(__dirname, 'frontend', 'dist')

const app = express()

// Middlewares
app.use(helmet())                // secure headers
app.use(compression())           // gzip responses
app.use(cors({                   // adjust origin as needed
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))
app.use(morgan('combined'))      // request logging
app.use(express.json())          // parse JSON bodies
app.use(express.urlencoded({     // parse URL-encoded bodies
  extended: true
}))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' })
})

// Serve static assets from the Vite build
app.use(express.static(DIST_DIR, {
  maxAge: '1d',
  index: false
}))

// SPA fallback: serve index.html for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    process.exit(0)
  })
})
