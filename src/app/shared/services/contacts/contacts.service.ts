/**
 * The idea behind this service is to be able to get a different api providers for contacts (e.g google, apple and others)
 * but wrap them in a single service and expose the same api for all of them,
 * I will be happy to elaborate if needed
 */
// ANGULAR
import {Inject, Injectable, Injector, Optional} from '@angular/core';

// VENDORS
import {Observable} from "rxjs";

// APP
import {HoneybookContacts} from "./providers/honeybook/honeybook-contacts.service";
import {environment} from "../../../../environments/environment";
import {ContactModel} from "./contact.model";

// VENDOR


/**
 * list of contacts providers we support
 */
export const PROVIDER_LIST = {
  HONEYBOOK: HoneybookContacts
};

/**
 * create a map between each provider and his configuration
 * not relevant just for demonstration of how to work with 3rd party API
 */
const providersConfig = new Map();
providersConfig.set(PROVIDER_LIST.HONEYBOOK, {
  accessKey: environment.honeybook.accessKey,
  secret: environment.honeybook.secretKey
});


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private api: any;

  /**
   * Each module / component can pass to the service which contact provide he wants to use
   * @param contactProvider provider to use
   * @param options as configuration object for the provider
   * @param injector
   */
  constructor(
    private injector: Injector,
    @Inject('contactProvider') @Optional() public contactProvider?: any,
    @Inject('options') @Optional() public options?: any,
  ) {
    this.contactProvider = contactProvider || injector.get(PROVIDER_LIST.HONEYBOOK);
    this.options = options || providersConfig.get(this.contactProvider);
    this.api = new this.contactProvider(injector);

  }

  /**
   * return list of contacts from selected provider
   */
  public getContactList(): Observable<ContactModel[]> {
    return this.api.getContactList();
  }

}
