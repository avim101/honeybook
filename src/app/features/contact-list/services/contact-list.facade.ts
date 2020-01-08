// NG
import {Injectable} from '@angular/core';

// APP
import {ContactListService} from './contact-list.service';
import {ContactCard} from "../../../components/contact-card/contact-card.model";


@Injectable({
  providedIn: 'root'
})
export class ContactListFacade {

  constructor(private contactListService: ContactListService) {
  }

  /**
   * get list of contacts and return list of contact card
   */
  public getContactList(): Promise<ContactCard[]> {
    return this.contactListService.getContactList()
      .toPromise()
      .then(res => res.map((contact) => {
          return {
            title: contact.name,
            src: contact.profile_image,
            company_name: contact.company_name,
            job: contact.job,
            email: contact.email,
            phone: contact.phone,
            icon: contact.icon
          }
        }
      ))
  }

}
