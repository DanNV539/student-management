import { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import 'dotenv/config'
import connectToDatabase from './databases/mongo.init.js'
import { NotFoundError } from './errors/error.response.js'
import { CustomErrorType } from './errors/CustomError.js'
import routes from './routes/index.js'
import swaggerV1 from './swagger/swaggerV1.js'
import swaggerV2 from './swagger/swaggerV2.js'

const app = express()

//init dbs
connectToDatabase()

// middleware
app.use(helmet())
app.use(morgan('combined'))
app.use(compression())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

// Swagger setup for V1
const swaggerUiV1 = swaggerUi.setup(swaggerV1)
app.use('/api-docs/v1', swaggerUi.serveFiles(swaggerV1, {}), swaggerUiV1)

// Swagger setup for V2
const swaggerUiV2 = swaggerUi.setup(swaggerV2)
app.use('/api-docs/v2', swaggerUi.serveFiles(swaggerV2, {}), swaggerUiV2)

//router
app.use(routes)

// Error Handling Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError()
  next(error)
})

app.use((error: CustomErrorType, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500
  return res.status(statusCode).send({
    status: 'Error',
    statusCode: error.statusCode || 500,
    message: error.message || 'Internal Server Error',
    stack: error.stack
  })
})

export default app
