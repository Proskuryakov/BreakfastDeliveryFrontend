import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterOrderInputModel } from '../../orders/models/order.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RegisterUserInputModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  constructor(private readonly http: HttpClient) {}

  createUser(input: RegisterUserInputModel): Observable<RegisterUserInputModel> {
    return this.http.post<RegisterUserInputModel>(`${environment.api}/users`, input);
  }
}
