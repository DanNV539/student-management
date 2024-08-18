import swaggerJSDoc from 'swagger-jsdoc'
import config from '@/config/setting.config.js'

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
        url: `http://${config.app.host}:${config.app.port}/api/v2`,
        description: 'Local server'
      }
    ]
  }
}

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/v2/**/*.ts']
}

export default swaggerJSDoc(options as any)
