import { Request, Response } from 'express'
import Enrollment from '@/models/enrollment.model.js'

// Create a new enrollment
export const createEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollment = new Enrollment(req.body)
    await enrollment.save()
    res.status(201).json(enrollment)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Get all enrollments with pagination and sorting
export const getAllEnrollments = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'enrollmentDate'
    const order = (req.query.order as string) || 'asc'

    const validSortBy = ['enrollmentDate']
    if (!validSortBy.includes(sortBy)) {
      return res.status(400).json({ error: 'Invalid sortBy field' })
    }
    if (!['asc', 'desc'].includes(order)) {
      return res.status(400).json({ error: 'Invalid order field' })
    }

    const skip = (page - 1) * limit

    const enrollments = await Enrollment.find()
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .populate('student')
      .populate('course')

    const totalEnrollments = await Enrollment.countDocuments()

    res.json({
      total: totalEnrollments,
      page,
      limit,
      data: enrollments
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Other CRUD functions remain unchanged

// Get an enrollment by ID
export const getEnrollmentById = async (req: Request, res: Response) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('student').populate('course')
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' })
    }
    res.json(enrollment)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Update an enrollment
export const updateEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('student')
      .populate('course')
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' })
    }
    res.json(enrollment)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Delete an enrollment
export const deleteEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id)
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' })
    }
    res.json({ message: 'Enrollment deleted successfully' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
