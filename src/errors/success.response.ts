import { CustomSuccessType } from '../types/index.type.js'
import { STATUS_CODES } from '../utils/statusCodes.js'
import { CustomSuccess } from './CustomSuccess.js'

export class OK extends CustomSuccess {
  constructor({ message, statusCode = STATUS_CODES.OK, metadata }: CustomSuccessType) {
    super({ message, statusCode, metadata })
  }
}

export class CREATED extends CustomSuccess {
  constructor({ message, statusCode = STATUS_CODES.CREATED, metadata }: CustomSuccessType) {
    super({ message, statusCode, metadata })
  }
}
