import { ContactService } from './../../services/contact.service';
import { IContact } from './../../models/IContact';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public loading : boolean = false;
  public contact : IContact = {} as IContact;
  public errorMessage : string | null =null

  constructor(private contactService : ContactService,
              private router:Router) {

   }

  ngOnInit(): void {
    

}

createSubmit(){
  this.contactService.createContact(this.contact).subscribe((data:IContact)=>{
this.router.navigate(['/']).then();
  },(error)=>{
    this.errorMessage = error;
    this.router.navigate(['/contact/add']).then();
  })
}

}
