import { CustomError } from '@/errors/CustomError.js'
import { BadRequestError } from '@/errors/error.response.js'
import { NextFunction, Request, Response } from 'express'

type AsyncHandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>

const API_VERSIONS = ['1', '2']

const asyncHandler = (callback: AsyncHandlerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch((error: CustomError) => next(error))
  }
}

export const versionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const version = (req.headers['x-api-version'] || '1') as string

  if (!API_VERSIONS.includes(version)) {
    throw new BadRequestError('Unsupported API version')
  }

  req.apiVersion = version
  next()
}

export default asyncHandler
