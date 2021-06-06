import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Authentication } from '../model';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  getErrorMessageEmail() {
    if (this.loginForm.get('username').hasError('required')) {
      return 'Você precisa inserir o username';
    }

    return this.loginForm.get('username').hasError('email') ? 'Não é um email valido' : '';
  }
  getErrorMessagePassword() {
    if (this.loginForm.get('password').hasError('required')) {
      return 'Você precisa inserir a senha';
    }
  }



  authentication: Authentication;

  constructor(public loginService: LoginService,private router:Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = 'linear-gradient(to right, #f64f59, #c471ed, #12c2e9)'
  }

  ngOnDestroy(): void{
    document.querySelector('html').style.background = 'none'
  }

  login(){
    this.authentication = this.loginForm.value
    if(this.loginForm.valid){
      this.loginService.authenticate(this.authentication).subscribe(
        token => {
          const tokenDecoded = atob(token.split(':')[0])
          const username = tokenDecoded.split(':')[0]
          const password = tokenDecoded.split(':')[1]
          const admin = token.split(':')[1]
          localStorage.setItem('username',username);
          localStorage.setItem('password',password);
          localStorage.setItem('admin',admin);
          localStorage.setItem('token', token);
          this.router.navigate(['/contact_list'])
        },
        () =>{
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: 'Campos invalidos',
            confirmButtonText: 'OK'
          })
        }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ooops!',
        text: 'Preencha todos os campos',
        confirmButtonText: 'OK'
      })
    }
  }

}
