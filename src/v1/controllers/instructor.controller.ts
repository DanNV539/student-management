import { Request, Response } from 'express'
import Instructor from '@/v1/models/instructor.model.js'

// Create a new instructor
export const createInstructor = async (req: Request, res: Response) => {
  try {
    const instructor = new Instructor(req.body)
    await instructor.save()
    res.status(201).json(instructor)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Get all instructors with pagination and sorting
export const getAllInstructors = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'lastName'
    const order = (req.query.order as string) || 'asc'

    const validSortBy = ['firstName', 'lastName', 'email']
    if (!validSortBy.includes(sortBy)) {
      return res.status(400).json({ error: 'Invalid sortBy field' })
    }
    if (!['asc', 'desc'].includes(order)) {
      return res.status(400).json({ error: 'Invalid order field' })
    }

    const skip = (page - 1) * limit

    const instructors = await Instructor.find()
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .populate('department')
      .populate('courses')

    const totalInstructors = await Instructor.countDocuments()

    res.json({
      total: totalInstructors,
      page,
      limit,
      data: instructors
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Other CRUD functions remain unchanged

// Get an instructor by ID
export const getInstructorById = async (req: Request, res: Response) => {
  try {
    const instructor = await Instructor.findById(req.params.id).populate('courses')
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' })
    }
    res.json(instructor)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Update an instructor
export const updateInstructor = async (req: Request, res: Response) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('courses')
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' })
    }
    res.json(instructor)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Delete an instructor
export const deleteInstructor = async (req: Request, res: Response) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id)
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' })
    }
    res.json({ message: 'Instructor deleted successfully' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
