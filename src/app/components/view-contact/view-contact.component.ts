import { IContact } from './../../models/IContact';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public loading:boolean = false;
  

  // fetch the data

  public contactId: string | null = null;

  public contact : IContact = {} as IContact;

  public errorMessage :string | null = null;
  

  constructor(private activateRoute : ActivatedRoute,
              private contactService: ContactService) { }

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe((param:ParamMap)=>{
      this.contactId = param.get('contactId')

    })
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data:IContact)=>{

        this.contact = data;
        this.loading = false
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      

      });

    }

  }
  // checking wheather view contact is not empty

  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 ;
  }
      
    
  }


