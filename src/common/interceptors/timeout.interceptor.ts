import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, timeout } from "rxjs";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle()
                    .pipe(timeout(1000))
    }
}