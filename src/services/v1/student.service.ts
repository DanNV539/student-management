import { NotFoundError } from '@/errors/error.response.js'
import { IStudent } from '@/models/student.model.js'
import { StudentRepository } from '@/repositories/v1/student.repository.js'
import { TQueryParams } from '@/types/index.type.js'

export class StudentService {
  static async createStudent({ student }: { student: IStudent }) {
    try {
      return await StudentRepository.createStudent({ student })
    } catch (error) {
      throw error
    }
  }

  static async getAllStudents({ page, limit, sortBy, order }: TQueryParams) {
    try {
      const validSortBy = ['firstName', 'lastName', 'email', 'dateOfBirth']
      if (!validSortBy.includes(sortBy)) {
        throw new NotFoundError('Invalid sortBy field')
      }
      if (!['asc', 'desc'].includes(order)) {
        throw new NotFoundError('Invalid order field')
      }

      const skip = (page - 1) * limit

      return await StudentRepository.getAllStudents({ page, limit, skip, sortBy, order })
    } catch (error) {
      throw error
    }
  }

  static async getStudentById({ studentId }: { studentId: string }) {
    try {
      const student = await StudentRepository.getStudentById({ studentId })

      if (!student) {
        throw new NotFoundError('Student not found')
      }
      return student
    } catch (error) {
      throw error
    }
  }

  static async updateStudent({ studentId, student }: { studentId: string; student: IStudent }) {
    try {
      const updatedStudent = await StudentRepository.updateStudent({ studentId, student })

      if (!updatedStudent) {
        throw new NotFoundError('Student not found')
      }

      return updatedStudent
    } catch (error) {
      throw error
    }
  }

  static async deleteStudent({ studentId }: { studentId: string }) {
    try {
      const deletedStudent = await StudentRepository.deleteStudent({ studentId })

      if (!deletedStudent) {
        throw new NotFoundError('Student not found')
      }

      return deletedStudent
    } catch (error) {
      throw error
    }
  }
}
