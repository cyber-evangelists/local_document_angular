// login.component.ts
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  isLoggingIn: boolean = false;

  constructor(private authService: AuthService,
    private router : Router,
    private toastr: ToastrService) {}

    onSubmit(): void {
      if (this.username !== '' && this.password !== '') {
        this.isLoggingIn = true; // Disable the button
        this.authService.login(this.username, this.password).subscribe((authenticated) => {
          this.isLoggingIn = false; // Enable the button after the API call is complete,
          if (authenticated) {
            this.toastr.success('SuccessFully Login', 'Success');
            this.router.navigate(['/home']);
          } else {
            this.error = 'Login failed';
            this.toastr.warning('Login failed', 'Warn');

          }
        });
      }
    }
    

}
