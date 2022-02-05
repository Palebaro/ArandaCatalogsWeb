import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/api/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'login-authorization',
  templateUrl: './login-authorization.component.html',
  styleUrls: ['./login-authorization.component.scss']
})
export class LoginAuthorizationComponent implements OnInit {
  userLogin : LoginModel;
  form: any;
  error: string = '';
  loadIsService: boolean;
  constructor(private authenticationService : AuthenticationService,private formBuilder: FormBuilder,private snackBar: MatSnackBar, private router:Router) {
    this.form = formBuilder.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  validateUser(){
    this.error = '';
    this.loadIsService = true;
    this.userLogin = this.form.value;
    this.authenticationService.getUsers().subscribe(resp =>{
      const validateLogin = resp.find(user =>( user.userName == this.userLogin.Username && user.password == this.userLogin.Password));
      if(!isNullOrUndefined(validateLogin)){
        this.loadIsService = false;
        this.router.navigate(['/Consulta']);
      }else{
        this.error = 'El usuario o la contraseña son inconrrectas.';
        this.loadIsService = false;
      }
    },
    error =>{

    })
  }
}
