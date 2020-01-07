// NG
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

// VENDOR

// APP
import {CardComponent} from "../components/card";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {ContactCardModule} from "../components/contact-card/contact-card.module";
import {CardModule} from "../components/card/card.module";

@NgModule({
  declarations: [
  ],
  imports: [
    // NG
    CommonModule,

    // VENDOR
    NgZorroAntdModule,
    LazyLoadImageModule.forRoot({}),

    // APP
    ContactCardModule,
    CardModule
  ],
  exports: [
    // NG
    CommonModule,

    // VENDOR
    NgZorroAntdModule,
    LazyLoadImageModule,

    // APP
    ContactCardModule,
    CardModule
  ]
})
export class SharedModule {
}
