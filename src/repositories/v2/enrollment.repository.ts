import enrollmentModel, { IEnrollment } from '@/models/enrollment.model.js'
import { TQueryParams } from '@/types/index.type.js'

export class EnrollmentRepository {
  static async createEnrollment({ enrollment }: { enrollment: IEnrollment }) {
    try {
      const data = new enrollmentModel(enrollment)
      return await data.save()
    } catch (error) {
      throw error
    }
  }

  static async getAllEnrollments({ page, limit, skip = 0, sortBy, order }: TQueryParams) {
    try {
      const enrollments = await enrollmentModel
        .find()
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .populate('student')
        .populate('course')

      const totalEnrollments = await enrollmentModel.countDocuments()

      return {
        total: totalEnrollments,
        page,
        limit,
        data: enrollments
      }
    } catch (error) {
      throw error
    }
  }

  static async getEnrollmentById({ enrollmentId }: { enrollmentId: string }) {
    try {
      return await enrollmentModel.findById(enrollmentId).populate('student').populate('course')
    } catch (error) {
      throw error
    }
  }

  static async updateEnrollment({ enrollmentId, enrollment }: { enrollmentId: string; enrollment: IEnrollment }) {
    try {
      return await enrollmentModel
        .findByIdAndUpdate(enrollmentId, enrollment, { new: true })
        .populate('student')
        .populate('course')
    } catch (error) {
      throw error
    }
  }

  static async deleteEnrollment({ enrollmentId }: { enrollmentId: string }) {
    try {
      return await enrollmentModel.findByIdAndDelete(enrollmentId)
    } catch (error) {
      throw error
    }
  }
}
