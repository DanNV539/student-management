import enrollmentRoutes from './enrollments/index.js'
import gradeRoutes from './grades/index.js'
import express from 'express'
const router = express.Router()

router.use('/enrollments', enrollmentRoutes)
router.use('/grades', gradeRoutes)

export default router
