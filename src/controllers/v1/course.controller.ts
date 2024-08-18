import { Request, Response } from 'express'
import { CourseService } from '@/services/v1/course.service.js'
import { CREATED, OK } from '@/errors/success.response.js'
export class CourseController {
  static async createCourse(req: Request, res: Response) {
    return new CREATED({
      message: 'Create course successfully',
      metadata: await CourseService.createCourse(req.body)
    }).send(res)
  }

  static async getAllCourses(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'courseName'
    const order = (req.query.order as string) || 'asc'

    return new OK({
      message: 'Get all courses successfully',
      metadata: await CourseService.getAllCourses({ page, limit, sortBy, order })
    }).send(res)
  }

  static async getCourseById(req: Request, res: Response) {
    return new OK({
      message: 'Get course detail successfully',
      metadata: await CourseService.getCourseById({ courseId: req.params.id })
    }).send(res)
  }

  static async updateCourse(req: Request, res: Response) {
    const courseId = req.params.id
    const course = req.body

    return new OK({
      message: 'Update course successfully',
      metadata: await CourseService.updateCourse({ courseId, course })
    }).send(res)
  }

  static async deleteCourse(req: Request, res: Response) {
    return new OK({
      message: 'Delete course successfully',
      metadata: await CourseService.deleteCourse({ courseId: req.params.id })
    })
  }
}
