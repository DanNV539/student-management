import gradeModel, { IGrade } from '@/models/grade.model.js'
import { TQueryParams } from '@/types/index.type.js'

export class GradeRepository {
  static async createGrade({ grade }: { grade: IGrade }) {
    try {
      const data = new gradeModel(grade)
      return await data.save()
    } catch (error) {
      throw error
    }
  }

  static async getAllGrades({ page, limit, sortBy, order, skip = 0 }: TQueryParams) {
    try {
      const grades = await gradeModel
        .find()
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .populate('student')
        .populate('course')

      const totalGrades = await gradeModel.countDocuments()

      return {
        total: totalGrades,
        page,
        limit,
        data: grades
      }
    } catch (error) {
      throw error
    }
  }

  static async getGradeById({ gradeId }: { gradeId: string }) {
    try {
      return await gradeModel.findById(gradeId).populate('student').populate('course')
    } catch (error) {
      throw error
    }
  }

  static async updateGrade({ gradeId, grade }: { gradeId: string; grade: IGrade }) {
    try {
      return await gradeModel.findByIdAndUpdate(gradeId, grade, { new: true }).populate('student').populate('course')
    } catch (error) {
      throw error
    }
  }

  static async deleteGrade({ gradeId }: { gradeId: string }) {
    try {
      return await gradeModel.findByIdAndDelete(gradeId)
    } catch (error) {
      throw error
    }
  }
}
