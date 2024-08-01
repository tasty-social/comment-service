import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse()

    console.log(exceptionResponse)

    const errorResponse = {
      status: 'error',
      message: exception.message || 'Internal server error',
      data: typeof exceptionResponse === 'string' ? { error: exceptionResponse } : exceptionResponse,
      timestamp: new Date().toISOString(),
      path: request.url
    }

    response.status(status).json(errorResponse)
  }
}
