const studentSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      description: 'First name of the student',
      example: 'John'
    },
    lastName: {
      type: 'string',
      description: 'Last name of the student',
      example: 'Doe'
    },
    email: {
      type: 'string',
      description: 'Email address of the student',
      format: 'email',
      example: 'john.doe@example.com'
    },
    dateOfBirth: {
      type: 'string',
      description: 'Date of birth of the student',
      format: 'date',
      example: '2000-01-01'
    },
    grades: {
      type: 'object',
      description: 'Grades for different subjects',
      additionalProperties: {
        type: 'number',
        format: 'float',
        example: 85.5
      },
      example: {
        Math: 95,
        Science: 88.5,
        History: 92
      }
    },
    enrollmentDate: {
      type: 'string',
      description: 'Date when the student enrolled',
      format: 'date-time',
      example: '2024-08-01T12:00:00Z'
    },
    courses: {
      type: 'array',
      description: 'List of courses the student is enrolled in',
      items: {
        type: 'string',
        description: 'Course ID',
        example: '6123456789abcdef12345678'
      }
    },
    enrollments: {
      type: 'string',
      description: 'Enrollment ID',
      example: '6123456789abcdef12345679'
    }
  },
  required: ['firstName', 'lastName', 'email', 'dateOfBirth']
} as const

export default studentSchema

export const components = {
  schemas: {
    Student: studentSchema
  }
}
