import {
  Component,
  OnInit,
  TrackByFunction
} from '@angular/core';

@Component({
  templateUrl: './numbers.page.html',
  styleUrls: ['./numbers.page.sass']
})
export class NumbersPage implements OnInit {
  number = 0;

  numbers: { value: string }[] = [];

  constructor() {}

  trackByFn: TrackByFunction<{ value: string }> = (
    index,
    item
  ) => item.value;

  ngOnInit(): void {}

  handleValueChange(value: number): void {
    this.number = value;
    this.numbers = [];
    for (let i = 0; i < value; i++) {
      this.numbers.push({
        value: i.toString(16)
      });
    }
  }
}
