import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../model';
import { UserService } from '../service/users/user.service';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit {

  user: User = null

  userForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    username:  new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    admin: new FormControl('')
  });


  constructor(private router:Router, private UserService:UserService) { }

  setuserForm(id:number,name:string,username:string,password:string,admin:boolean){
    this.userForm.get('id').setValue(id);
    this.userForm.get('name').setValue(name);
    this.userForm.get('username').setValue(username);
    this.userForm.get('password').setValue(password);
    this.userForm.get('admin').setValue(admin);
  }

  ngOnInit(): void {
    this.UserService.botaoEdit.subscribe( edit => {
     if(edit){
      this.user = edit;
      this.setuserForm(edit.id,edit.name,edit.username,edit.password, edit.admin)
     }
    });
  }

  createUser(){
    if(this.userForm.valid){
      this.user = this.userForm.value
      this.UserService.createUser(this.user).subscribe(
        () =>{
          Swal.fire({
            icon: 'success',
            title: 'Aeee!',
            text: 'Usuario criado com sucesso'
          })
          this.router.navigate(['/user_list'])
        },
        () =>{
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: 'Erro ao criar usuario'
          })
        }
        )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ooops!',
        text: 'Preecha os campos'
      })
    }
  }

  updateUser(){
    if (this.userForm.valid){
      this.user = this.userForm.value;
      this.UserService.updateUser(this.user).subscribe(
        () => {
          Swal.fire({
            title: 'Eeeeba!',
            text: 'Usuario editado com sucesso',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/user_list']);
        },
        () => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao editar usuario',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      );
    }else{
      Swal.fire({
        title: 'Ooops!',
        text: 'Preencha todos os campos',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }
}
