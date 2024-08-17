export const components = {
  schemas: {
    Student: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          description: 'The unique identifier for a student'
        },
        firstName: {
          type: 'string',
          description: 'The first name of the student'
        },
        lastName: {
          type: 'string',
          description: 'The last name of the student'
        },
        email: {
          type: 'string',
          description: 'The email of the student'
        },
        department: {
          type: 'string',
          description: 'The department ID of the student'
        }
      },
      required: ['firstName', 'lastName', 'email', 'department']
    }
    // Add definitions for Instructor, Department, and Grade similarly
  }
}
