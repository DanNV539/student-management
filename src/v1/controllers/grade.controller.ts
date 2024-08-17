import { Request, Response } from 'express'
import Grade from '@/v1/models/grade.model.js'

// Create a new grade
export const createGrade = async (req: Request, res: Response) => {
  try {
    const grade = new Grade(req.body)
    await grade.save()
    res.status(201).json(grade)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Get all grades with pagination and sorting
export const getAllGrades = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'date'
    const order = (req.query.order as string) || 'asc'

    const validSortBy = ['grade', 'date']
    if (!validSortBy.includes(sortBy)) {
      return res.status(400).json({ error: 'Invalid sortBy field' })
    }
    if (!['asc', 'desc'].includes(order)) {
      return res.status(400).json({ error: 'Invalid order field' })
    }

    const skip = (page - 1) * limit

    const grades = await Grade.find()
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .populate('student')
      .populate('course')

    const totalGrades = await Grade.countDocuments()

    res.json({
      total: totalGrades,
      page,
      limit,
      data: grades
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Other CRUD functions remain unchanged

// Get a grade by ID
export const getGradeById = async (req: Request, res: Response) => {
  try {
    const grade = await Grade.findById(req.params.id).populate('student').populate('course')
    if (!grade) {
      return res.status(404).json({ error: 'Grade not found' })
    }
    res.json(grade)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Update a grade
export const updateGrade = async (req: Request, res: Response) => {
  try {
    const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('student')
      .populate('course')
    if (!grade) {
      return res.status(404).json({ error: 'Grade not found' })
    }
    res.json(grade)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Delete a grade
export const deleteGrade = async (req: Request, res: Response) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id)
    if (!grade) {
      return res.status(404).json({ error: 'Grade not found' })
    }
    res.json({ message: 'Grade deleted successfully' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
