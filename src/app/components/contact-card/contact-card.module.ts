// NG
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

// VENDORS
import {NgZorroAntdModule, NZ_ICONS} from "ng-zorro-antd";
import {DeleteOutline, EditOutline, MoreOutline} from "@ant-design/icons-angular/icons";
import {IconDefinition} from "@ant-design/icons-angular";
import {LazyLoadImageModule} from "ng-lazyload-image";

// APP
import {ContactCardComponent} from "./contact-card.component";
import {CardModule} from "../card/card.module";

const icons: IconDefinition[] = [ DeleteOutline, EditOutline, MoreOutline ];

@NgModule({
  declarations: [
    ContactCardComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgZorroAntdModule,
    LazyLoadImageModule,
    CardModule,
  ],
  exports: [
    ContactCardComponent
  ],
  providers: [
    {
      provide: NZ_ICONS, useValue: icons
    }
  ]
})
export class ContactCardModule {
}
