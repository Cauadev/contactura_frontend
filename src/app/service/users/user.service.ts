import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public dataEdit = new BehaviorSubject<User>(null);
  botaoEdit = this.dataEdit.asObservable();

  constructor(private http: HttpClient) { }


  api_url = environment.api_url+ "/user";
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');

  getUsers(){
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username + ':' + this.password)});
    return this.http.get<User[]>(this.api_url, {headers})
    .pipe(
      map(
        UserData => {
          if(UserData){
            return UserData;
          }else{
            return [];
          }
        }
      )
      );
  }

  deleteUser(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username + ':' + this.password)});
    return this.http.delete<string>(this.api_url+'/'+id, {headers})
    .pipe(
      map(
        data => {
          return data
        }
      )
      );
  }

  createUser(User: User){
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username + ':' + this.password)});
    return this.http.post<User>(this.api_url, User, {headers})
            .pipe(
              map(data =>{
                return data;
              })
            );
  }

  getUserForList(User: User){
    this.dataEdit.next(User);
  }

  updateUser(User: User){
    const id = User.id;
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.put<User>(this.api_url + '/' + id, User, {headers}).pipe(
      map(data => {
          return data;
        }
      )
    );
  }
}
