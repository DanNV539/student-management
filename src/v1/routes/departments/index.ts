import { Router } from 'express'
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} from '@/v1/controllers/department.controller.js'

const router = Router()

router.post('/', createDepartment)
router.get('/', getAllDepartments)
router.get('/:id', getDepartmentById)
router.put('/:id', updateDepartment)
router.delete('/:id', deleteDepartment)

export default router
