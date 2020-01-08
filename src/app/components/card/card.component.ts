import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'hb-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  /**
   * @description card id
   */
  @Input() public id?: string | number;

  /**
   * @description card title
   */
  @Input() public title: string;

  /**
   * @description card description to display under the title
   */
  @Input() public description?: TemplateRef<void> | string;

  /**
   * @description an external template for different actions,
   * each html template must contain the template id and can have icon with CB function
   * can contains up to 3 actions,
   * @example
   * <ng-template #actionSetting>
   *   <i nz-icon nzType="delete" (click)="onDeleted(img)"></i>
   * </ng-template>
   */
  @Input() public actions: Array<TemplateRef<void>> = [];

  /**
   * @description card cover image template
   */
  @Input() public coverTemplate: TemplateRef<void> = null;

  /**
   * @description card avatar template
   */
  @Input() public avatar: TemplateRef<void> = null;

  /**
   * rather or not car should show box shadow on hover
   */
  @Input() public hoverable = true;


  constructor() {
  }

  ngOnInit() {
  }

}
