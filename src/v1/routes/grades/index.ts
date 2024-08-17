import { Router } from 'express'
import { createGrade, getAllGrades, getGradeById, updateGrade, deleteGrade } from '@/v1/controllers/grade.controller.js'

const router = Router()

router.post('/', createGrade)
router.get('/', getAllGrades)
router.get('/:id', getGradeById)
router.put('/:id', updateGrade)
router.delete('/:id', deleteGrade)

export default router
