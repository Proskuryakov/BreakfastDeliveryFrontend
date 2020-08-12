import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { CookieService } from 'ngx-cookie-service';

interface CityFormValue {
  city: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;

  private cookieValue: string | undefined;

  city = '';
  cities = ['Moscow', 'Saint-Petersburg', 'Voronezh', 'Kazan', 'Samara', 'Khabarovsk', 'Vladivostok'];

  filteredCities: ReplaySubject<string[]> = new ReplaySubject<string[]>();

  public cityCtrl: FormControl = new FormControl();

  public cityFilterCtrl: FormControl = new FormControl();

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect | undefined;

  protected _onDestroy = new Subject<void>();

  constructor(private readonly dataService: DataService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('city');
    this.cityCtrl.setValue(this.cities);
    this.filteredCities.next(this.cities.slice());
    this.cityFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterCities();
    });
  }

  setCityDataService(value: string): void {
    this.dataService.setCity(value);
    this.cookieService.set('city', value);
    this.cookieValue = this.cookieService.get('city');
  }

  protected filterCities(): void {
    if (!this.cities) {
      return;
    }
    let search = this.cityFilterCtrl.value;
    if (!search) {
      this.filteredCities.next(this.cities.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCities.next(this.cities.filter((city) => city.toLowerCase().indexOf(search) > -1));
  }

  getPlaceholder(): string {
    if (this.cookieValue === undefined || this.cookieValue === '') {
      return 'Your city';
    } else {
      return this.cookieValue;
    }
  }
}
