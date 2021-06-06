import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from 'src/app/model';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //puxando variavel do environment
  api_url = environment.api_url;

  authenticate(authentication: Authentication){
    const headers = new HttpHeaders({
      Authorization: 'Basic '+btoa(authentication.username+ ':' + authentication.password)})
    return this.http.get<string>(this.api_url + '/user/login', {headers})
    .pipe(
      map(
        authData => {
          return authData;
        }
      )
    );
  }
}
