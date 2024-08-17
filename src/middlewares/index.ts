import { CustomError } from '@/errors/CustomError.js'
import { NextFunction, Request, Response } from 'express'

type AsyncHandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>

const asyncHandler = (callback: AsyncHandlerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch((error: CustomError) => next(error))
  }
}

export default asyncHandler
