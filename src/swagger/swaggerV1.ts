import swaggerJSDoc from 'swagger-jsdoc'
import { components } from './components.js'
import config from '@/config/setting.config.js'

console.log('URL ==========>', `http://${config.app.host}:${config.app.port}/api/v1`)

const swaggerDefinition = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management API V1',
      version: '1.0.0',
      description: 'API documentation for the Student Management system V1'
    },
    servers: [
      {
        url: `http://${config.app.host}:${config.app.port}/api/v1`,
        description: 'Local server'
      }
    ],
    components
  }
}

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/v1/**/*.ts']
}

export default swaggerJSDoc(options as any)
