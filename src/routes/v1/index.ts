import studentRoutes from './students/index.js'
import courseRoutes from './courses/index.js'
import instructorRoutes from './instructors/index.js'
import express from 'express'
const router = express.Router()

router.use('/students', studentRoutes)
router.use('/courses', courseRoutes)
router.use('/instructors', instructorRoutes)

export default router
