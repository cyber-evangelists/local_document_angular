import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Keys } from './Keys';

@Injectable({
  providedIn: 'root',
})

export class AuthService {


  constructor(private apiservice:ApiService){
  }

  login(username: string, password: string) {
    if(username == "admin" && password == "admin")
    {
           sessionStorage.setItem(Keys.USERNAME_KEY, username);
           sessionStorage.setItem(Keys.USERPASS_KEY, password);
    }

      // this.apiservice.login(username, password).subscribe(
      // (data) => {
      //   if (data.status == 'login sucessfull') {
      //     sessionStorage.setItem(Keys.USERNAME_KEY, username);
      //     sessionStorage.setItem(Keys.USERPASS_KEY, password);
      //   }
      // },
      // (error) => {
      //   console.error('Error while logins:', error);
      // } 
      // );
  }
  
  

  isAuthenticated(username:string,password:string): boolean {
    this.login(username, password);
    return !!sessionStorage.getItem(Keys.USERNAME_KEY);
  }
}