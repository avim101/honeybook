// ANGULAR
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

// APP
import {ContactListFacade} from './services/contact-list.facade';
import {ContactCard} from "../../components/contact-card/contact-card.model";

@Component({
  selector: 'hb-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactListComponent implements OnInit {

  /**
   * array of contact to display
   */
  public filteredList: ContactCard[] = [];

  /**
   * loader when getting the lis of img
   */
  public listLoading = true;

  /**
   * contact list
   */
  private contactList: ContactCard[] = [];

  constructor(private facade: ContactListFacade) {

  }

  async ngOnInit() {
    try {
      this.contactList = await this.facade.getContactList();
      this.filteredList = [...this.contactList];
    } catch (e) {
      // error handling
    }
    this.listLoading = false;
  }

  onSearchChanged(text: string) {
    if (!text) {
      return this.filteredList = [...this.contactList];
    }
    return this.filteredList = this.contactList
      .filter((contact) => {
        if (
          contact.company_name.toLowerCase().includes(text) ||
          contact.title.toLowerCase().includes(text) ||
          contact.job.toLowerCase().includes(text)) {
          return contact;
        }
      });
  }
}
