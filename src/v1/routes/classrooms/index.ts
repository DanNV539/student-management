import { Router } from 'express'
import {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroom,
  deleteClassroom
} from '@/v1/controllers/classroom.controller.js'

const router = Router()

router.post('/', createClassroom)
router.get('/', getAllClassrooms)
router.get('/:id', getClassroomById)
router.put('/:id', updateClassroom)
router.delete('/:id', deleteClassroom)

export default router
