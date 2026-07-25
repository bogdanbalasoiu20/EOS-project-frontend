import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

//ataseaza automat token-ul la fiecare request, cu exceptia request-urilor de login si register
export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    
    if(req.url.includes('/login') || req.url.includes('/register')) {
        return next(req);
    }

    const token: string | null = localStorage.getItem('token');
    let processedRequest;
    
    //daca exista un token in localStorage, inseamna ca utilizatorul este logat, deci putem atasa token-ul la request in header-ul Authorization
    if(token) {
        processedRequest = req.clone({ // request-ul e imutabil, deci trebuie sa cream o copie a request-ului si sa adaugam token-ul in header-ul Authorization
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
    }else{
        processedRequest = req; //daca nu exista token, nu facem nicio modificare la request
    }

    // trimitem request-ul procesat catre backend si in caz ca primim un raspuns cu status 401 sau 403, stergem token-ul din localStorage si redirectionam utilizatorul catre pagina de login
    return next(processedRequest).pipe(
        catchError((error) => {
            if(error.status===401||error.status===403){ // utilizatorul nu mai are acces (token invalid sau expirat), iar request-urile pot esua, deci stergem datele din localStorage si redirectionam utilizatorul catre pagina de login
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                router.navigate(['/login']);
            }
        
            return throwError(() => error);
        })
    );
};