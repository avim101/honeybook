// ANGULAR
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// VENDORS
import {LazyLoadImageModule} from "ng-lazyload-image";

// APP
import { ContactListComponent } from './contact-list.component';
import { ContactListRoutingModule } from './contact-list-routing.module';
import {SharedModule} from "../../shared";


@NgModule({
  declarations: [
    ContactListComponent
  ],
  imports: [
    ContactListRoutingModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    SharedModule
  ]
})
export class ContactListModule {
}
