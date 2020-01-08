// NG
import {NgModule} from '@angular/core';

// APP
import {CardComponent} from "./card.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule {
}
