import { Router } from 'express'
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from '@/v1/controllers/course.controller.js'

const router = Router()

router.post('/', createCourse)
router.get('/', getAllCourses)
router.get('/:id', getCourseById)
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)

export default router
