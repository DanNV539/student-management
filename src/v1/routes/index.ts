import studentRoutes from './students/index.js'
import courseRoutes from './courses/index.js'
import instructorRoutes from './instructors/index.js'
import enrollmentRoutes from './enrollments/index.js'
import gradeRoutes from './grades/index.js'
import departmentRoutes from './departments/index.js'
import classroomRoutes from './classrooms/index.js'
import express from 'express'
const router = express.Router()

router.use('/students', studentRoutes)
router.use('/courses', courseRoutes)
router.use('/instructors', instructorRoutes)
router.use('/enrollments', enrollmentRoutes)
router.use('/grades', gradeRoutes)
router.use('/departments', departmentRoutes)
router.use('/classrooms', classroomRoutes)

export default router
