import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DishesFromOrderToDisplayModel, DishFromOrderModel} from "../../dishes/models/dish.model";
import {from, Observable} from "rxjs";
import {mergeMap, tap, toArray} from "rxjs/operators";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class FilesApiService {
  constructor(private readonly http: HttpClient) {
  }

  // tslint:disable-next-line:no-any
  uploadFile(file: File): Observable<Response> {

    const formData = new FormData();
    formData.append('file', file, file.name);
    // @ts-ignore
    return this.http.post('http://127.0.0.1:8080/api/storage/upload', formData);
  }

}


