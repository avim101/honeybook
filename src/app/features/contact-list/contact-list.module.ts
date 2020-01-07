// ANGULAR
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// VENDORS
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// APP
import { ContactListComponent } from './contact-list.component';
import { ContactListRoutingModule } from './contact-list-routing.module';
import {SharedModule} from "../../shared";
import {LazyLoadImageModule} from "ng-lazyload-image";




@NgModule({
  declarations: [
    ContactListComponent
  ],
  imports: [
    ContactListRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    LazyLoadImageModule,
    SharedModule

  ]
})
export class ContactListModule {
}
