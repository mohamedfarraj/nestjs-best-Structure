import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let message = exception.getResponse();
    if (typeof exception.getResponse() == 'object') {
      const res: any = exception.getResponse();
      if (
        res.statusCode &&
        res.statusCode == 400 &&
        res.error &&
        res.error == 'Bad Request'
      ) {
        if (typeof res.message == 'string') {
          message = res.message;
        } else {
          message = res.message[0];
        }
      }
      if (res.statusCode && res.statusCode == 401) {
        message = 'UnAuthorized';
      }
    }

    response.status(status).json({
      statusCode: status,
      data: {
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      },
    });
  }
}
