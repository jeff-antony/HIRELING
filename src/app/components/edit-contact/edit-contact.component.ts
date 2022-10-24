import { ContactService } from './../../services/contact.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  public loading : boolean = false;
  public contactId: string | null =null
  public contact : IContact = {} as IContact;
  public errorMessage : string | null =null

  constructor(private activatedRoute:ActivatedRoute,
              private contactService:ContactService,
              private router:Router) { }

  ngOnInit(): void {
    this.loading=false
    this.activatedRoute.paramMap.subscribe((param:ParamMap)=>{
      this.contactId = param.get('contactId')

    });
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe((data:IContact)=>{
        this.contact = data;
        this.loading=false

      },
      (error)=>{
        this.errorMessage = error
        this.loading=false;
      })
      
    }
  }

 public updateSubmit(){
    if (this.contactId) {
      this.contactService.updateContact(this.contact, this.contactId).subscribe((data:IContact)=>{
        this.router.navigate(['/']).then();
      }, (error)=>{
        this.errorMessage = error;
        this.router.navigate([`/contact/edit/${this.contactId}`]).then();
      });
      
    }  
       
  }
}
