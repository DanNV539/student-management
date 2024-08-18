import instructorModel, { IInstructor } from '@/models/instructor.model.js'
import { TQueryParams } from '@/types/index.type.js'

export class InstructorRepository {
  static async createInstructor(data: IInstructor) {
    try {
      const instructor = new instructorModel(data)
      return await instructor.save()
    } catch (error) {
      throw error
    }
  }

  static async getAllInstructors({ page, limit, skip = 0, sortBy, order }: TQueryParams) {
    try {
      const instructors = await instructorModel
        .find()
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .populate('courses')

      const totalInstructors = await instructorModel.countDocuments()

      return {
        total: totalInstructors,
        page,
        limit,
        data: instructors
      }
    } catch (error) {
      throw error
    }
  }

  static async getInstructorById({ instructorId }: { instructorId: string }) {
    try {
      return await instructorModel.findById(instructorId).populate('courses')
    } catch (error) {
      throw error
    }
  }

  static async updateInstructor({ instructorId, instructor }: { instructorId: string; instructor: IInstructor }) {
    try {
      return await instructorModel.findByIdAndUpdate(instructorId, instructor, { new: true }).populate('courses')
    } catch (error) {
      throw error
    }
  }

  static async deleteInstructor({ instructorId }: { instructorId: string }) {
    try {
      return await instructorModel.findByIdAndDelete(instructorId)
    } catch (error) {
      throw error
    }
  }
}
