import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.sass']
})
export class CounterComponent implements OnInit {
  @Input()
  value = 0;

  @Output()
  valueChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  subtract(): void {
    this.setNewValue(this.value - 1);
  }

  add(): void {
    this.setNewValue(this.value + 1);
  }

  private setNewValue(newValue: number): void {
    this.value = newValue;
    this.valueChange.emit(this.value);
  }
}
