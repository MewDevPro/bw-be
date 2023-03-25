import type { Response } from 'express'

export function response<T>(res: Response, data: T, statusCode = 200): Response {
  return res.sendStatus(statusCode).json({
    statusCode: statusCode,
    data: data
  })
}