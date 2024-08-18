import { NotFoundError } from '@/errors/error.response.js'
import { IGrade } from '@/models/grade.model.js'
import { GradeRepository } from '@/repositories/v2/grade.repository.js'
import { TQueryParams } from '@/types/index.type.js'

export class GradeService {
  static async createGrade({ grade }: { grade: IGrade }) {
    try {
      return await GradeRepository.createGrade({ grade })
    } catch (error) {
      throw error
    }
  }

  static async getAllGrades({ page, limit, sortBy, order }: TQueryParams) {
    try {
      const validSortBy = ['grade', 'date']
      if (!validSortBy.includes(sortBy)) {
        throw new NotFoundError('Invalid sortBy field')
      }
      if (!['asc', 'desc'].includes(order)) {
        throw new NotFoundError('Invalid order field')
      }

      const skip = (page - 1) * limit

      return await GradeRepository.getAllGrades({ page, limit, sortBy, order, skip })
    } catch (error) {
      throw error
    }
  }

  static async getGradeById({ gradeId }: { gradeId: string }) {
    try {
      const grade = await GradeRepository.getGradeById({ gradeId })

      if (!grade) {
        throw new NotFoundError('Grade not found')
      }

      return grade
    } catch (error) {
      throw error
    }
  }

  static async updateGrade({ gradeId, grade }: { gradeId: string; grade: IGrade }) {
    try {
      const updatedGrade = await GradeRepository.updateGrade({ gradeId, grade })

      if (!updatedGrade) {
        throw new NotFoundError('Grade not found')
      }

      return updatedGrade
    } catch (error) {
      throw error
    }
  }

  static async deleteGrade({ gradeId }: { gradeId: string }) {
    try {
      const deletedGrade = await GradeRepository.deleteGrade({ gradeId })

      if (!deletedGrade) {
        throw new NotFoundError('Grade not found')
      }

      return deletedGrade
    } catch (error) {
      throw error
    }
  }
}
