import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResponseDto } from './response..dto'

@Injectable()
export class TransformInterceptor implements NestInterceptor<ResponseDto, any> {
  intercept(context: ExecutionContext, next: CallHandler<ResponseDto>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => ({
        status: data.status || 'success',
        message: data.message || 'Request successful',
        data: data.data || data,
        timestamp: new Date().toISOString(),
        path: data.path
      }))
    )
  }
}
