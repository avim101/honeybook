// NG
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

// VENDORS
import {fromEvent, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'hb-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements AfterViewInit, OnDestroy {

  @Output() onChange = new EventEmitter<string>();

  /**
   * @description search input element
   */
  @ViewChild('searchInput', {static: false}) private searchInput: ElementRef;

  /**
   * use to close all component stream ant prevent potential memory leaks
   */
  private componentUnsubscribe$ = new Subject<void>();

  constructor() {
  }


  ngAfterViewInit() {
    //create a stream from the input change event
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        // close stream
        takeUntil(this.componentUnsubscribe$),
        //ignore when empty
        filter(Boolean),
        //delay the output event
        debounceTime(300),
        // compare between prev and current value and fire only if there is changes
        distinctUntilChanged(),
        // do action when change
        tap(() => {
          const inputValue = this.searchInput.nativeElement.value;
          this.onChange.emit(inputValue);
        })
      )
      // start to listing
      .subscribe();
  }

  ngOnDestroy(): void {
    this.componentUnsubscribe$.next();
    this.componentUnsubscribe$.complete();
  }

}
