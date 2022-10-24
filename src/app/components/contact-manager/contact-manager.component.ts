import { ContactService } from './../../services/contact.service';
import { IContact } from './../../models/IContact';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  public loading:boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;

  constructor(private contactService: ContactService) {

   }

  ngOnInit(): void {
    // When the page load we have to call the service
    
    this.getAllContactFromServer()
   

    }

    public getAllContactFromServer(){
      this.loading = true;
    this.contactService.getAllContacts().subscribe((data:IContact[])=>{

      this.contacts = data;
      this.loading = false;
    }, 
    (error)=>{
      this.errorMessage = error;
      this.loading = false
    });
    }

    clickDeleteContact(contactId: string){
      if (contactId) {
        this.contactService.deleteContact(contactId).subscribe((data:{})=>{
          this.getAllContactFromServer()
        },
        (error)=>{
          this.errorMessage = error;
        })
      }
    }

    
  }


