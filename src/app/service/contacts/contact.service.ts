import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from 'src/app/model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public dataEdit = new BehaviorSubject<Contact>(null);
  botaoEdit = this.dataEdit.asObservable();

  constructor(private http: HttpClient) { }


  api_url = environment.api_url+ "/contactura";
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');

  getContacts(){
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username + ':' + this.password)});
    return this.http.get<Contact[]>(this.api_url, {headers})
    .pipe(
      map(
        contactData => {
          if(contactData){
            return contactData;
          }else{
            return [];
          }
        }
      )
      );
  }

  deleteContact(id: number){
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

  createContact(contact: Contact){
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username + ':' + this.password)});
    return this.http.post<Contact>(this.api_url, contact, {headers})
            .pipe(
              map(data =>{
                return data;
              })
            );
  }

  getContactForList(contact: Contact){
    this.dataEdit.next(contact);
  }

  updateContact(contact: Contact){
    const id = contact.id;
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.put<Contact>(this.api_url + '/' + id, contact, {headers}).pipe(
      map(data => {
          return data;
        }
      )
    );
  }

}
