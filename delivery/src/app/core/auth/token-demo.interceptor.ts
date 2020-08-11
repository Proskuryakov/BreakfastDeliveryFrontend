import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { CurrentUserService } from './current-user.service';

// http.get()
//  --> interceptor1
//  --> interceptor2
//  --> API
//  --> interceptor2
//  --> interceptor1
//  --> .subscribe()

@Injectable()
export class TokenDemoInterceptor implements HttpInterceptor {
  constructor(private readonly currentUserService: CurrentUserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('request', request.url);
    return this.currentUserService.user$.pipe(
      first(),
      switchMap((user) => {
        const newReq = request.clone({
          setHeaders: {
            // Authorization: `Barrier ${user.token}`
            'X-req-trace': user.authenticated ? user.username : 'anonymous'
          }
        });
        return next.handle(newReq).pipe(
          tap((response) => {
            console.log('response for', request.url, response.type);
          })
        );
      })
    );
  }
}

export const TOKEN_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenDemoInterceptor,
  multi: true
};
