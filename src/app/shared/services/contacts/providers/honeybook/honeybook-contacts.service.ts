// NG
import {Injectable, Injector} from "@angular/core";
import {HttpClient} from "@angular/common/http";

// VENDOR
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HoneybookContacts {
  private basePath = 'https://candidate-test.herokuapp.com';
  private http: HttpClient;

  constructor(private injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  /**
   * return list of contacts from api
   */
  public getContactList(): Observable<any> {
    return this.http.get(`${this.basePath}/contacts`);
  }
}
