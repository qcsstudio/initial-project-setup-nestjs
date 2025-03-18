import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // //console.log('intercept...');
        const response = context.switchToHttp().getResponse();
        const now = Date.now();
        return next.handle().pipe(
            map((data: any) => {
                data = (data) ? data : []
                return {
                    statusCode: response.statusCode,
                    message: data.message || 'Success',
                    total_count: data?.total_count,
                    count: data?.count,
                    data: data?.data,
                };
            }),
        );
    }
}
