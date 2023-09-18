import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Keys } from './Keys';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {


  constructor(private apiservice:ApiService){
  }

  login(username: string, password: string): Observable<boolean> {
    return this.apiservice.login(username, password).pipe(
      map((data) => {
        if (data.status == 'login sucessfull') {
          sessionStorage.setItem(Keys.USERNAME_KEY, data.username);
          sessionStorage.setItem(Keys.USERPASS_KEY, data.password);
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error while logging in:', error);
        return of(false);
      })
    );
  }
  
  

  isAuthenticated(username:string,password:string): boolean {
    this.login(username, password);
    return !!sessionStorage.getItem(Keys.USERNAME_KEY);
  }
}