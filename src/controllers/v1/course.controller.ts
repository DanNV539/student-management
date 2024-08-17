import { Request, Response } from 'express'
import Course from '@/models/course.model.js'

// Create a new course
export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = new Course(req.body)
    await course.save()
    res.status(201).json(course)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Get all courses with pagination and sorting
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'courseName'
    const order = (req.query.order as string) || 'asc'

    const validSortBy = ['courseName', 'courseCode', 'description']
    if (!validSortBy.includes(sortBy)) {
      return res.status(400).json({ error: 'Invalid sortBy field' })
    }
    if (!['asc', 'desc'].includes(order)) {
      return res.status(400).json({ error: 'Invalid order field' })
    }

    const skip = (page - 1) * limit

    const courses = await Course.find()
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .populate('instructor')
      .populate('classroom')

    const totalCourses = await Course.countDocuments()

    res.json({
      total: totalCourses,
      page,
      limit,
      data: courses
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Other CRUD functions remain unchanged

// Get a course by ID
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id).populate('students')
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json(course)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Update a course
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('students')
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json(course)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Delete a course
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json({ message: 'Course deleted successfully' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
