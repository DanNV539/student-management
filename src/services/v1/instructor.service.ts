import { NotFoundError } from '@/errors/error.response.js'
import { IInstructor } from '@/models/instructor.model.js'
import { InstructorRepository } from '@/repositories/v1/instructor.repository.js'
import { TQueryParams } from '@/types/index.type.js'

export class InstructorService {
  static async createInstructor(data: IInstructor) {
    try {
      return await InstructorRepository.createInstructor(data)
    } catch (error) {
      throw error
    }
  }

  static async getAllInstructors({ page, limit, sortBy, order }: TQueryParams) {
    try {
      const validSortBy = ['firstName', 'lastName', 'email']
      if (!validSortBy.includes(sortBy)) {
        throw new NotFoundError('Invalid sortBy field')
      }
      if (!['asc', 'desc'].includes(order)) {
        throw new NotFoundError('Invalid order field')
      }

      const skip = (page - 1) * limit

      return await InstructorRepository.getAllInstructors({ page, limit, skip, order, sortBy })
    } catch (error) {
      throw error
    }
  }

  static async getInstructorById({ instructorId }: { instructorId: string }) {
    try {
      const instructor = await InstructorRepository.getInstructorById({ instructorId })
      if (!instructor) {
        throw new NotFoundError('Instructor not found')
      }
      return instructor
    } catch (error) {
      throw error
    }
  }

  static async updateInstructor({ instructorId, instructor }: { instructorId: string; instructor: IInstructor }) {
    try {
      const updatedInstructor = await InstructorRepository.updateInstructor({ instructorId, instructor })

      if (!updatedInstructor) {
        throw new NotFoundError('Instructor not found')
      }

      return updatedInstructor
    } catch (error) {
      throw error
    }
  }

  static async deleteInstructor({ instructorId }: { instructorId: string }) {
    try {
      const deletedInstructor = await InstructorRepository.deleteInstructor({ instructorId })

      if (!deletedInstructor) {
        throw new NotFoundError('Instructor not found')
      }

      return deletedInstructor
    } catch (error) {
      throw error
    }
  }
}
