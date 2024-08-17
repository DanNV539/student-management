import { Request, Response } from 'express'
import Department from '@/v1/models/department.model.js'

// Create a new department
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const department = new Department(req.body)
    await department.save()
    res.status(201).json(department)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Get all departments with pagination and sorting
export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'departmentName'
    const order = (req.query.order as string) || 'asc'

    const validSortBy = ['departmentName', 'location']
    if (!validSortBy.includes(sortBy)) {
      return res.status(400).json({ error: 'Invalid sortBy field' })
    }
    if (!['asc', 'desc'].includes(order)) {
      return res.status(400).json({ error: 'Invalid order field' })
    }

    const skip = (page - 1) * limit

    const departments = await Department.find()
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .populate('instructors')

    const totalDepartments = await Department.countDocuments()

    res.json({
      total: totalDepartments,
      page,
      limit,
      data: departments
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Other CRUD functions remain unchanged

// Get a department by ID
export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const department = await Department.findById(req.params.id).populate('instructors')
    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }
    res.json(department)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Update a department
export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(
      'instructors'
    )
    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }
    res.json(department)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Delete a department
export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id)
    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }
    res.json({ message: 'Department deleted successfully' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
