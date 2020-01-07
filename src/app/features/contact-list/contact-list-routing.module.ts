// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// APP
import { ContactListComponent } from './contact-list.component';
import {SharedModule} from "../../shared";

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ]
})
export class ContactListRoutingModule {
}
