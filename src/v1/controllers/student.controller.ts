import { Request, Response } from 'express'
import Student from '@/v1/models/student.model.js'

// Create a new student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = new Student(req.body)
    await student.save()
    res.status(201).json(student)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Get all students with pagination and sorting
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'lastName'
    const order = (req.query.order as string) || 'asc'

    const validSortBy = ['firstName', 'lastName', 'email', 'dateOfBirth']
    if (!validSortBy.includes(sortBy)) {
      return res.status(400).json({ error: 'Invalid sortBy field' })
    }
    if (!['asc', 'desc'].includes(order)) {
      return res.status(400).json({ error: 'Invalid order field' })
    }

    const skip = (page - 1) * limit

    const students = await Student.find()
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .populate('enrollments')

    const totalStudents = await Student.countDocuments()

    res.json({
      total: totalStudents,
      page,
      limit,
      data: students
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Other CRUD functions remain unchanged

// Get a student by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id).populate('courses')
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.json(student)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Update a student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('courses')
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.json(student)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.json({ message: 'Student deleted successfully' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
