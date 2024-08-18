import { Request, Response } from 'express'
import Student, { IStudent } from '@/models/student.model.js'
import { CREATED, OK } from '@/errors/success.response.js'
import { StudentService } from '@/services/v1/student.service.js'

export class StudentController {
  static async createStudent(req: Request, res: Response) {
    return new CREATED({
      message: 'Create student successfully',
      metadata: await StudentService.createStudent({ student: req.body })
    }).send(res)
  }

  static async getAllStudents(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'lastName'
    const order = (req.query.order as string) || 'asc'

    return new OK({
      message: 'Get all students successfully',
      metadata: await StudentService.getAllStudents({ page, limit, sortBy, order })
    }).send(res)
  }

  static async getStudentById(req: Request, res: Response) {
    return new OK({
      message: 'Get student successfully',
      metadata: await StudentService.getStudentById({ studentId: req.params.id })
    }).send(res)
  }

  static async updateStudent(req: Request, res: Response) {
    return new OK({
      message: 'Update student successfully',
      metadata: await StudentService.updateStudent({ studentId: req.params.id, student: req.body })
    }).send(res)
  }

  static async deleteStudent(req: Request, res: Response) {
    return new OK({
      message: 'Delete student successfully',
      metadata: await StudentService.deleteStudent({ studentId: req.params.id })
    }).send(res)
  }
}
