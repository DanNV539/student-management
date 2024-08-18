import { BadRequestError, NotFoundError } from '@/errors/error.response.js'
import courseModel, { ICourse } from '@/models/course.model.js'
import { CourseRepository } from '@/repositories/v1/course.repository.js'
import { TQueryParams } from '@/types/index.type.js'

export class CourseService {
  static async createCourse(data: ICourse) {
    try {
      return await CourseRepository.createCourse(data)
    } catch (error) {
      throw error
    }
  }

  static async getAllCourses({ page, limit, sortBy, order }: TQueryParams) {
    try {
      const validSortBy = ['courseName', 'courseCode', 'description']

      if (!validSortBy.includes(sortBy)) {
        throw new BadRequestError('Invalid sortBy field')
      }
      if (!['asc', 'desc'].includes(order)) {
        throw new BadRequestError('Invalid order field')
      }

      const skip = (page - 1) * limit

      return await CourseRepository.getAllCourses({ page, limit, sortBy, order, skip })
    } catch (error) {
      throw error
    }
  }

  static async getCourseById({ courseId }: { courseId: string }) {
    try {
      const course = await CourseRepository.getCourseById({ courseId })

      if (!course) {
        throw new NotFoundError('Course not found')
      }
      return course
    } catch (error) {
      throw error
    }
  }

  static async updateCourse({ courseId, course }: { courseId: string; course: ICourse }) {
    try {
      const updatedCourse = await CourseRepository.updateCourse({ courseId, course })

      if (!updatedCourse) {
        throw new NotFoundError('Course not found')
      }

      return updatedCourse
    } catch (error) {
      throw error
    }
  }

  static async deleteCourse({ courseId }: { courseId: string }) {
    try {
      const deletedCourse = await CourseRepository.deleteCourse({ courseId })

      if (!deletedCourse) {
        throw new NotFoundError('Course not found')
      }

      return deletedCourse
    } catch (error) {
      throw error
    }
  }
}
