// ANGULAR
import {Component, Input, OnInit} from '@angular/core';

// APP
import {CardComponent} from "../card";

@Component({
  selector: 'hb-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent extends CardComponent implements OnInit {

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
   * @description contact icon
   */
  @Input() public icon?: string;

  /**
   * @description contact company name
   */
  @Input() public company_name?: string;

  /**
   * @description contact job
   */
  @Input() public job?: string;

  /**
   * @description contact email
   */
  @Input() public email?: string;

  /**
   * @description contact phone
   */
  @Input() public phone?: string;

  constructor() {
    super();
  }
}
