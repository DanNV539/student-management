import { Router } from 'express'
import {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor
} from '@/controllers/v1/instructor.controller.js'

const router = Router()

router.post('/', createInstructor)
router.get('/', getAllInstructors)
router.get('/:id', getInstructorById)
router.put('/:id', updateInstructor)
router.delete('/:id', deleteInstructor)

export default router
