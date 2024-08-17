import { NextFunction, Request, Response } from 'express'

import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import { CustomError, CustomErrorType } from './v1/errors/CustomError.js'
import { NotFoundError } from './v1/errors/error.response.js'
import 'dotenv/config'
import connectToDatabase from './v1/databases/mongo.init.js'
import routes from './v1/routes/index.route.js'

// Initialize environment variables
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
