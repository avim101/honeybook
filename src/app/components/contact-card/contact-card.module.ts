// NG
import {NgModule} from '@angular/core';

// APP
import {ContactCardComponent} from "./contact-card.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgZorroAntdModule, NZ_ICONS, NzFormModule, NzIconModule, NzPopoverModule} from "ng-zorro-antd";
import {CardModule} from "../card/card.module";
import {IconDefinition} from "@ant-design/icons-angular";
import {DeleteOutline, EditOutline, MoreOutline} from "@ant-design/icons-angular/icons";

const icons: IconDefinition[] = [ DeleteOutline, EditOutline, MoreOutline ];

@NgModule({
  declarations: [
    ContactCardComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgZorroAntdModule,
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
