import { Request, Response } from 'express'
import Classroom from '@/v1/models/classroom.model.js'

// Create a new classroom
export const createClassroom = async (req: Request, res: Response) => {
  try {
    const classroom = new Classroom(req.body)
    await classroom.save()
    res.status(201).json(classroom)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Get all classrooms with pagination and sorting
export const getAllClassrooms = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'roomNumber'
    const order = (req.query.order as string) || 'asc'

    const validSortBy = ['roomNumber', 'building']
    if (!validSortBy.includes(sortBy)) {
      return res.status(400).json({ error: 'Invalid sortBy field' })
    }
    if (!['asc', 'desc'].includes(order)) {
      return res.status(400).json({ error: 'Invalid order field' })
    }

    const skip = (page - 1) * limit

    const classrooms = await Classroom.find()
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .populate('courses')

    const totalClassrooms = await Classroom.countDocuments()

    res.json({
      total: totalClassrooms,
      page,
      limit,
      data: classrooms
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Other CRUD functions remain unchanged

// Get a classroom by ID
export const getClassroomById = async (req: Request, res: Response) => {
  try {
    const classroom = await Classroom.findById(req.params.id).populate('courses')
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' })
    }
    res.json(classroom)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Update a classroom
export const updateClassroom = async (req: Request, res: Response) => {
  try {
    const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('courses')
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' })
    }
    res.json(classroom)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Delete a classroom
export const deleteClassroom = async (req: Request, res: Response) => {
  try {
    const classroom = await Classroom.findByIdAndDelete(req.params.id)
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' })
    }
    res.json({ message: 'Classroom deleted successfully' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
