import { Request, Response } from 'express'
import Enrollment from '@/models/enrollment.model.js'
import { CREATED, OK } from '@/errors/success.response.js'
import { EnrollmentService } from '@/services/v2/enrollment.service.js'

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

export class EnrollmentController {
  static async createEnrollment(req: Request, res: Response) {
    return new CREATED({
      message: 'Create enrollment successfully',
      metadata: await EnrollmentService.createEnrollment({ enrollment: req.body })
    }).send(res)
  }

  static async getAllEnrollments(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'enrollmentDate'
    const order = (req.query.order as string) || 'asc'

    return new OK({
      message: 'Get all enrollments successfully',
      metadata: await EnrollmentService.getAllEnrollments({ page, limit, sortBy, order })
    }).send(res)
  }

  static async getEnrollmentById(req: Request, res: Response) {
    return new OK({
      message: 'Get enrollment successfully',
      metadata: await EnrollmentService.getEnrollmentById({ enrollmentId: req.params.id })
    }).send(res)
  }

  static async updateEnrollment(req: Request, res: Response) {
    return new OK({
      message: 'Update enrollment successfully',
      metadata: await EnrollmentService.updateEnrollment({ enrollmentId: req.params.id, enrollment: req.body })
    }).send(res)
  }

  static async deleteEnrollment(req: Request, res: Response) {
    return new OK({
      message: 'Delete enrollment successfully',
      metadata: await EnrollmentService.deleteEnrollment({ enrollmentId: req.params.id })
    }).send(res)
  }
}
