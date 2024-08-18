import { Request, Response } from 'express'
import Grade from '@/models/grade.model.js'
import { CREATED, OK } from '@/errors/success.response.js'
import { GradeService } from '@/services/v2/grade.service.js'

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

export class GradeController {
  static async createGrade(req: Request, res: Response) {
    return new CREATED({
      message: 'Create grade successfully',
      metadata: await GradeService.createGrade({ grade: req.body })
    }).send(res)
  }

  static async getAllGrades(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const sortBy = (req.query.sortBy as string) || 'date'
    const order = (req.query.order as string) || 'asc'

    return new OK({
      message: 'Get grades successfully',
      metadata: await GradeService.getAllGrades({ page, limit, sortBy, order })
    }).send(res)
  }

  static async getGradeById(req: Request, res: Response) {
    return new OK({
      message: 'Get grade successfully',
      metadata: await GradeService.getGradeById({ gradeId: req.params.id })
    }).send(res)
  }

  static async updateGrade(req: Request, res: Response) {
    return new OK({
      message: 'Update grade successfully',
      metadata: await GradeService.updateGrade({ gradeId: req.params.id, grade: req.body })
    }).send(res)
  }

  static async deleteGrade(req: Request, res: Response) {
    return new OK({
      message: 'Delete grade successfully',
      metadata: await GradeService.deleteGrade({ gradeId: req.params.id })
    }).send(res)
  }
}
