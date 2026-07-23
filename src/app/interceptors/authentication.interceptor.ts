import { HttpInterceptorFn } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
    if(req.url.includes('/login') || req.url.includes('/register')) {
        return next(req);
    }

    const token: string | null = localStorage.getItem('token');
    let processedRequest;
    if(token) {
        processedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
    }else{
        processedRequest = req;
    }

    return next(processedRequest);
};