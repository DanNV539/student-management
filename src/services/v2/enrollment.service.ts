import { NotFoundError } from '@/errors/error.response.js'
import { IEnrollment } from '@/models/enrollment.model.js'
import { EnrollmentRepository } from '@/repositories/v2/enrollment.repository.js'
import { TQueryParams } from '@/types/index.type.js'

export class EnrollmentService {
  static async createEnrollment({ enrollment }: { enrollment: IEnrollment }) {
    try {
      return await EnrollmentRepository.createEnrollment({ enrollment })
    } catch (error) {
      throw error
    }
  }

  static async getAllEnrollments({ page, limit, sortBy, order }: TQueryParams) {
    try {
      const validSortBy = ['enrollmentDate']

      if (!validSortBy.includes(sortBy)) {
        throw new NotFoundError('Invalid sortBy field')
      }

      if (!['asc', 'desc'].includes(order)) {
        throw new NotFoundError('Invalid order field')
      }

      const skip = (page - 1) * limit

      return await EnrollmentRepository.getAllEnrollments({ page, limit, skip, sortBy, order })
    } catch (error) {
      throw error
    }
  }

  static async getEnrollmentById({ enrollmentId }: { enrollmentId: string }) {
    try {
      const enrollment = await EnrollmentRepository.getEnrollmentById({ enrollmentId })

      if (!enrollment) {
        throw new NotFoundError('Enrollment not found')
      }

      return enrollment
    } catch (error) {
      throw error
    }
  }

  static async updateEnrollment({ enrollmentId, enrollment }: { enrollmentId: string; enrollment: IEnrollment }) {
    try {
      const updatedEnrollment = await EnrollmentRepository.updateEnrollment({ enrollmentId, enrollment })

      if (!updatedEnrollment) {
        throw new NotFoundError('Enrollment not found')
      }

      return updatedEnrollment
    } catch (error) {
      throw error
    }
  }

  static async deleteEnrollment({ enrollmentId }: { enrollmentId: string }) {
    try {
      const deletedEnrollment = await EnrollmentRepository.deleteEnrollment({ enrollmentId })

      if (!deletedEnrollment) {
        throw new NotFoundError('Enrollment not found')
      }

      return deletedEnrollment
    } catch (error) {
      throw error
    }
  }
}
