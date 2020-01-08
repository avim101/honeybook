import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputSearchComponent} from "./input-search.component";
import {NzIconModule, NzInputModule} from "ng-zorro-antd";



@NgModule({
  declarations: [
    InputSearchComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzIconModule
  ],
  exports:[
    InputSearchComponent
  ]
})
export class InputSearchModule { }
