import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../model';
import { UserService } from '../service/users/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: User[] = []

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe(data =>{
      this.userList = data
    },
    () => {
      Swal.fire({
        title: 'Ooops!',
        text: 'Erro ao retornar lista',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    })
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(data =>{
      this.getUsers()
      Swal.fire({
        icon: 'success',
        title: 'Sucesso.',
        text: data
      })
    })
  }

  editUser(user: User){
    this.userService.getUserForList(user);
    this.router.navigate(['/user']);
  }

  goToCreate(){
    this.userService.dataEdit = new BehaviorSubject<User>(null);
    this.userService.botaoEdit = this.userService.dataEdit.asObservable();
    this.router.navigate(['/user'])
  }
}
