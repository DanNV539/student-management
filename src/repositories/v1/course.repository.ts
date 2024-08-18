import courseModel, { ICourse } from '@/models/course.model.js'
import { TQueryParams } from '@/types/index.type.js'

export class CourseRepository {
  static async createCourse(data: ICourse) {
    try {
      const course = new courseModel(data)
      return await course.save()
    } catch (error) {
      throw error
    }
  }

  static async getAllCourses({ page, limit, skip = 0, sortBy, order }: TQueryParams) {
    try {
      const courses = await courseModel
        .find()
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .populate('instructor')

      const totalCourses = await courseModel.countDocuments()

      return {
        total: totalCourses,
        page,
        limit,
        data: courses
      }
    } catch (error) {
      throw error
    }
  }

  static async getCourseById({ courseId }: { courseId: string }) {
    try {
      return await courseModel.findById(courseId).populate('students')
    } catch (error) {
      throw error
    }
  }

  static async updateCourse({ courseId, course }: { courseId: string; course: ICourse }) {
    try {
      return await courseModel.findByIdAndUpdate(courseId, course, { new: true }).populate('students')
    } catch (error) {
      throw error
    }
  }

  static async deleteCourse({ courseId }: { courseId: string }) {
    try {
      return await courseModel.findByIdAndDelete(courseId)
    } catch (error) {
      throw error
    }
  }
}
