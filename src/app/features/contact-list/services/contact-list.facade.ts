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
   * get a pager options and return img card object
   */
  public getContactList(): Promise<ContactCard[]> {
    return this.contactListService.getContactList()
      .toPromise()
      .then(res => res.map((contact) => {
          return {
            title: contact.name,
            src: contact.profile_image,
            description: [contact.company_name, contact.job, contact.email].join(', '),
            icon: contact.icon
          }
        }
      ))
  }

}
