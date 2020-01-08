// ANGULAR
import { Injectable } from '@angular/core';

//VENDOR
import {Observable} from "rxjs";

// APP
import {ContactsService} from "../../../shared/services/contacts";
import {ContactModel} from "../../../shared/services/contacts/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactListService {

  constructor(private contactsApi: ContactsService) {
  }

  /**
   * get a pager options and return list of photos from the imgApi
   */
  public getContactList(): Observable<ContactModel[]> {
    return this.contactsApi.getContactList();
  }

}
