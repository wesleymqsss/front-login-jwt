import { HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

export const AUTH_TOKEN_ENABLED = new HttpContextToken<boolean>(() => true);

export function authInterceptor(
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
        const APLLY_AUTH_TOKEN = req.context.get(AUTH_TOKEN_ENABLED);
        const TOKEN = APLLY_AUTH_TOKEN ? localStorage.getItem('token') : null;
        
        if(APLLY_AUTH_TOKEN && !TOKEN){
            return throwError(() => new Error('Token nao econtrado.'));
        }

        const newReq = TOKEN ? req.clone({
            headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')} `)
        }) : req;

        return next(newReq);
}