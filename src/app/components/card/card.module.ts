// NG
import {NgModule} from '@angular/core';

// APP
import {CardComponent} from "./card.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {CommonModule} from "@angular/common";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    LazyLoadImageModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule {
}
