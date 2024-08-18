import express from 'express'
import v1Routes from './v1/index.js'
import v2Routes from './v2/index.js'

const router = express.Router()

// Routing based on the API version
router.use('/api/v1', (req, res, next) => {
  if (req.apiVersion === '1') {
    return v1Routes(req, res, next)
  }
  next()
})

router.use('/api/v2', (req, res, next) => {
  if (req.apiVersion === '2') {
    return v2Routes(req, res, next)
  }
  next()
})

export default router
