import { Response } from 'express'
import { REASON_PHRASES } from '../utils/reasonPhrases.js'
import { CustomSuccessType } from '../types/index.type.js'

export abstract class CustomSuccess {
  public message: string
  public statusCode: number
  public reasonStatusCode?: string
  public metadata: Record<string, any>

  constructor({ message, statusCode, reasonStatusCode = REASON_PHRASES.OK, metadata }: CustomSuccessType) {
    this.message = message || reasonStatusCode
    this.statusCode = statusCode
    this.metadata = metadata
  }

  public send(response: Response) {
    return response.status(this.statusCode).json(this)
  }
}
