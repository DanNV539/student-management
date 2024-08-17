import { REASON_PHRASES } from '../utils/reasonPhrases.js'
import { STATUS_CODES } from '../utils/statusCodes.js'
import { CustomError } from './CustomError.js'

export class BadRequestError extends CustomError {
  constructor(message = REASON_PHRASES.BAD_REQUEST, statusCode = STATUS_CODES.BAD_REQUEST) {
    super(message, statusCode)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
}

export class NotFoundError extends CustomError {
  constructor(message = REASON_PHRASES.NOT_FOUND, statusCode = STATUS_CODES.NOT_FOUND) {
    super(message, statusCode)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = REASON_PHRASES.FORBIDDEN, statusCode = STATUS_CODES.FORBIDDEN) {
    super(message, statusCode)
    Object.setPrototypeOf(this, ForbiddenError)
  }
}
