import { Component, OnInit } from '@angular/core';
import { Contact } from '../model';
import { ContactService } from '../service/contacts/contact.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contactList: Contact[] =[]

  constructor(private contactService: ContactService,private router:Router) { }

  ngOnInit(): void {
    this.getContacts()
  }

  getContacts(){
    this.contactService.getContacts().subscribe(
      data => {
        this.contactList = data;
      },
      () => {
        Swal.fire({
          title: 'Ooops!',
          text: 'Erro ao retornar lista',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    );
  }

  deleteContact(id: number){
    this.contactService.deleteContact(id).subscribe(data =>{
      this.getContacts()
      Swal.fire({
        icon: 'success',
        title: 'Sucesso.',
        text: data
      })
    })

  }

  goToCreate(){
    this.contactService.dataEdit = new BehaviorSubject<Contact>(null);
    this.contactService.botaoEdit = this.contactService.dataEdit.asObservable();
    this.router.navigate(['/contact'])
  }

  editContact(contact: Contact){
    this.contactService.getContactForList(contact);
    this.router.navigate(['/contact']);
  }

}
