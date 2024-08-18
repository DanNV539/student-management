import { Request, Response } from 'express'
import Instructor from '@/models/instructor.model.js'
import { CREATED, OK } from '@/errors/success.response.js'
import { InstructorService } from '@/services/v1/instructor.service.js'

export class InstructorController {
  static async createInstructor(req: Request, res: Response) {
    return new CREATED({
      message: 'Create instructor successfully',
      metadata: await InstructorService.createInstructor(req.body)
    }).send(res)
  }

  static async getAllInstructors(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'lastName'
    const order = (req.query.order as string) || 'asc'

    return new OK({
      message: 'Get instructors successfully',
      metadata: await InstructorService.getAllInstructors({ page, limit, sortBy, order })
    }).send(res)
  }

  static async getInstructorById(req: Request, res: Response) {
    return new OK({
      message: 'Get instructor successfully',
      metadata: await InstructorService.getInstructorById({ instructorId: req.params.id })
    })
  }

  static async updateInstructor(req: Request, res: Response) {
    return new OK({
      message: 'Update instructor successfully',
      metadata: await InstructorService.updateInstructor({ instructorId: req.params.id, instructor: req.body })
    }).send(res)
  }

  static async deleteInstructor(req: Request, res: Response) {
    return new OK({
      message: 'Delete instructor successfully',
      metadata: await InstructorService.deleteInstructor({ instructorId: req.params.id })
    }).send(res)
  }
}
