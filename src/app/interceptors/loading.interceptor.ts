import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "../service/loading.service";

export function loadingInterceptor(
    req: HttpRequest<unknown>,
    next:  HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    
    const loadingService =  inject(LoadingService);

    loadingService.showLoading();

    return next(req).pipe(
        finalize(()=>{
            loadingService.hideLoading();
        })
    );
    
}