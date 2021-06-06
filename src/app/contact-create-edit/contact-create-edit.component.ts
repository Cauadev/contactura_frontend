import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contact } from '../model';
import { ContactService } from '../service/contacts/contact.service';

@Component({
  selector: 'app-contact-create-edit',
  templateUrl: './contact-create-edit.component.html',
  styleUrls: ['./contact-create-edit.component.scss']
})
export class ContactCreateEditComponent implements OnInit {
  contact: Contact = null

  contactForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email:  new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });


  constructor(private router:Router, private contactService:ContactService) { }

  setContactForm(id:number,name:string,email:string,phone:string){
    this.contactForm.get('id').setValue(id);
    this.contactForm.get('name').setValue(name);
    this.contactForm.get('email').setValue(email);
    this.contactForm.get('phone').setValue(phone);
  }

  ngOnInit(): void {
    this.contactService.botaoEdit.subscribe( edit => {
     if(edit){
      this.contact = edit;
      this.setContactForm(edit.id,edit.name,edit.email,edit.phone)
     }
    });
  }

  createContact(){
    if(this.contactForm.valid){
      this.contact = this.contactForm.value
      this.contactService.createContact(this.contact).subscribe(
        () =>{
          Swal.fire({
            icon: 'success',
            title: 'Aeee!',
            text: 'Contato criado com sucesso'
          })
          this.router.navigate(['/contact_list'])
        },
        () =>{
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: 'Erro ao criar contato'
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

  updateContact(){
    if (this.contactForm.valid){
      this.contact = this.contactForm.value;
      this.contactService.updateContact(this.contact).subscribe(
        () => {
          Swal.fire({
            title: 'Eeeeba!',
            text: 'Contato editado com sucesso',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/contact_list']);
        },
        () => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao editar contato',
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
