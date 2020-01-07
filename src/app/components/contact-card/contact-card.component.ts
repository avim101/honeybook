// ANGULAR
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// APP
import { ImageCard } from './contact-card.model';
import {CardComponent} from "../card";

@Component({
  selector: 'hb-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: [ './contact-card.component.scss' ]
})
export class ContactCardComponent extends CardComponent implements OnInit {
  /**
   * a form to hold component inputs
   */
  public titleForm: FormGroup;

  /**
   * a variable to show / hide popover
   */
  public showPopover = false;

  /**
   * fire event when title changed
   */
  @Output() public titleChanged = new EventEmitter<{ img: ImageCard, title: string }>();

  /**
   * fire event when image is deleted
   */
  @Output() public deleted = new EventEmitter<ImageCard>();

  /**
   * fire event when details icon clicked
   */
  @Output() public showMore = new EventEmitter<ImageCard>();


  constructor(private formBuilder: FormBuilder) {
    super();
  }

  /**
   * angular init hook
   */
  ngOnInit() {
    this.titleForm = this.formBuilder.group({
      title: [ this.title, Validators.required ],
    });
  }

  /**
   * emit the deleted img when delete icon is clicked
   * @param img
   */
  public onDeleted(img: ImageCard) {
    this.deleted.emit(img);
  }

  /**
   * emit the deleted img when show more icon is clicked
   * @param img
   */
  public onShowMore(img: ImageCard) {
    this.showMore.emit(img);
  }

  /**
   * emit the editable img with the text to replace the title
   * emit only if the form is valid
   * @param img
   */
  public submitForm(img: ImageCard) {
    if (this.titleForm.valid) {
      this.showPopover = false;
      // fire title changed with the new value
      this.titleChanged.emit({ img, title: this.titleForm.controls['title'].value });
    }
  }
}
