import studentModel, { IStudent } from '@/models/student.model.js'
import { TQueryParams } from '@/types/index.type.js'

export class StudentRepository {
  static async createStudent({ student }: { student: IStudent }) {
    try {
      const data = new studentModel(student)
      return await data.save()
    } catch (error) {
      throw error
    }
  }

  static async getAllStudents({ page, limit, skip = 0, sortBy, order }: TQueryParams) {
    try {
      const students = await studentModel
        .find()
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .populate('enrollments')

      const totalStudents = await studentModel.countDocuments()

      return {
        total: totalStudents,
        page,
        limit,
        data: students
      }
    } catch (error) {
      throw error
    }
  }

  static async getStudentById({ studentId }: { studentId: string }) {
    try {
      return await studentModel.findById(studentId).populate('courses')
    } catch (error) {
      throw error
    }
  }

  static async updateStudent({ studentId, student }: { studentId: string; student: IStudent }) {
    try {
      return await studentModel.findByIdAndUpdate(studentId, student, { new: true }).populate('courses')
    } catch (error) {
      throw error
    }
  }

  static async deleteStudent({ studentId }: { studentId: string }) {
    try {
      return await studentModel.findByIdAndDelete(studentId)
    } catch (error) {
      throw error
    }
  }
}
