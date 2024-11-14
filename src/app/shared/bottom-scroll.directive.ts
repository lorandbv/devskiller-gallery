import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Directive({
  selector: '[scrollDirective]',
})
export class BottomScrollDirective implements OnInit {
  @Output() scrolledToEnd: EventEmitter<void> = new EventEmitter<void>();
  @Input() isLoading: boolean = false;

  scroll$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.scroll$
      .pipe(debounceTime(200))
      .subscribe(() => this.checkScrollAndEmit());
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.scroll$.next();
  }

  checkScrollAndEmit(): void {
    if (
      !this.isLoading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      this.scrolledToEnd.emit();
    }
  }
}
