import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import { components } from './components.js'

const swaggerDefinition = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management API V2',
      version: '1.0.0',
      description: 'API documentation for the Student Management system V2'
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Local server'
      }
    ],
    components
  }
}

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/v2/**/*.ts']
}

export default swaggerJSDoc(options as any)
