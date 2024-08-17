import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management API',
      version: '1.0.0',
      description: 'API documentation for the Student Management system'
    },
    servers: [
      {
        url: 'http://localhost:8000', // Update with your server's URL
        description: 'Local server'
      }
    ]
  },
  apis: ['./src/routes/**/*.ts'] // Path to your API routes for Swagger docs
}

const swaggerSpec = swaggerJsdoc(options)

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - department
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the student
 *         name:
 *           type: string
 *           description: The student's name
 *         age:
 *           type: integer
 *           description: The student's age
 *         department:
 *           type: string
 *           description: The department the student belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the student record
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the student record
 *     CreateStudentRequest:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - department
 *       properties:
 *         name:
 *           type: string
 *           description: The student's name
 *         age:
 *           type: integer
 *           description: The student's age
 *         department:
 *           type: string
 *           description: The department the student belongs to
 *     UpdateStudentRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The student's name
 *         age:
 *           type: integer
 *           description: The student's age
 *         department:
 *           type: string
 *           description: The department the student belongs to
 *     Course:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - creditHours
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the course
 *         name:
 *           type: string
 *           description: The course's name
 *         description:
 *           type: string
 *           description: The course's description
 *         creditHours:
 *           type: integer
 *           description: The course's credit hours
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the course record
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the course record
 *     CreateCourseRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - creditHours
 *       properties:
 *         name:
 *           type: string
 *           description: The course's name
 *         description:
 *           type: string
 *           description: The course's description
 *         creditHours:
 *           type: integer
 *           description: The course's credit hours
 *     UpdateCourseRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The course's name
 *         description:
 *           type: string
 *           description: The course's description
 *         creditHours:
 *           type: integer
 *           description: The course's credit hours
 *     Enrollment:
 *       type: object
 *       required:
 *         - studentId
 *         - courseId
 *         - semester
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the enrollment
 *         studentId:
 *           type: string
 *           description: The ID of the student enrolled
 *         courseId:
 *           type: string
 *           description: The ID of the course enrolled in
 *         semester:
 *           type: string
 *           description: The semester of enrollment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the enrollment record
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the enrollment record
 *     CreateEnrollmentRequest:
 *       type: object
 *       required:
 *         - studentId
 *         - courseId
 *         - semester
 *       properties:
 *         studentId:
 *           type: string
 *           description: The ID of the student to be enrolled
 *         courseId:
 *           type: string
 *           description: The ID of the course to enroll in
 *         semester:
 *           type: string
 *           description: The semester of enrollment
 *     UpdateEnrollmentRequest:
 *       type: object
 *       properties:
 *         studentId:
 *           type: string
 *           description: The ID of the student to be enrolled
 *         courseId:
 *           type: string
 *           description: The ID of the course to enroll in
 *         semester:
 *           type: string
 *           description: The semester of enrollment
 *     Classroom:
 *       type: object
 *       required:
 *         - roomNumber
 *         - building
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the classroom
 *         roomNumber:
 *           type: string
 *           description: The room number of the classroom
 *         building:
 *           type: string
 *           description: The building where the classroom is located
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the classroom record
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the classroom record
 *     CreateClassroomRequest:
 *       type: object
 *       required:
 *         - roomNumber
 *         - building
 *       properties:
 *         roomNumber:
 *           type: string
 *           description: The room number of the classroom
 *         building:
 *           type: string
 *           description: The building where the classroom is located
 *     UpdateClassroomRequest:
 *       type: object
 *       properties:
 *         roomNumber:
 *           type: string
 *           description: The room number of the classroom
 *         building:
 *           type: string
 *           description: The building where the classroom is located
 */
