// login.component.ts
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/proxy-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  error='';

  constructor(private authService: AuthService,
    private router : Router) {}

  onSubmit(): void {
    if(this.username != '' && this.password != '')
    {
      if (this.authService.isAuthenticated(this.username,this.password)) {
        console.log('Login successful');
        this.router.navigate(['/home']);
        
      } else {
        this.error ='Login failed';
      }
    }
  }

}
