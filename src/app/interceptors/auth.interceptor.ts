import { HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const AUTH_TOKEN_ENABLED = new HttpContextToken<boolean>(() => true);

export function authInterceptor(
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
        let newReq = req;
        console.log('token header adicao?', AUTH_TOKEN_ENABLED)
        const APLLY_AUTH_TOKEN = req.context.get(AUTH_TOKEN_ENABLED);
        if(APLLY_AUTH_TOKEN){
            newReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            });
            return next(newReq);
        }

        return next(newReq);
}