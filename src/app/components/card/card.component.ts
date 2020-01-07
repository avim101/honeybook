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
   * @description src property for card cover image
   */
  @Input() public src?: string;

  /**
   * @description a lazy load pixel image to display until image is fully loaded
   */
  @Input() public pixelSrc?: string;

  /**
   * @description img alt text
   */
  @Input() public alt?: string;

  /**
   * @description card title
   */
  @Input() public title: string;

  /**
   * @description card sub title to display under the title
   */
  @Input() public subTitle?: string;

  /**
   * @description an external template for different actions,
   * each html template must contain the template id and can have icon with CB function
   * can contains up to 3 actions,
   * @example
   * <ng-template #actionSetting>
   *   <i nz-icon nzType="delete" (click)="onDeleted(img)"></i>
   * </ng-template>
   */
  @Input() public actions?: Array<TemplateRef<void>>;

  /**
   * rather or not car should show box shadow on hover
   */
  @Input() public hoverable = true;


  constructor() { }

  ngOnInit() {
    console.log(this.actions);
  }

}
