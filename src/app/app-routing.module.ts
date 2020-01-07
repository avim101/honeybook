import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './features/home/welcome.component';


const routes: Routes = [
  /**
   * a demonstration of lazy load module,
   * this module is loaded only after user redirect to contact-list
   * watch network to see it works
   */
  {
    path: 'contact-list',
    loadChildren: () => import('./features/contact-list').then(m => m.ContactListModule)
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  // not implemented but the idea is to create a 404 page
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
