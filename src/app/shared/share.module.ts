// NG
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

// VENDOR

// APP
import {NgZorroAntdModule} from "ng-zorro-antd";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {ContactCardModule} from "../components/contact-card/contact-card.module";
import {CardModule} from "../components/card/card.module";
import {HttpClientModule} from "@angular/common/http";
import {InputSearchModule} from "../components/input-search/input-search.module";

@NgModule({
  declarations: [
  ],
  imports: [
    // NG
    CommonModule,
    HttpClientModule,

    // VENDOR
    NgZorroAntdModule,
    LazyLoadImageModule.forRoot({}),

    // APP
    ContactCardModule,
    CardModule,
    InputSearchModule
  ],
  exports: [
    // NG
    CommonModule,
    HttpClientModule,

    // VENDOR
    NgZorroAntdModule,
    LazyLoadImageModule,

    // APP
    ContactCardModule,
    CardModule,
    InputSearchModule
  ]
})
export class SharedModule {
}
