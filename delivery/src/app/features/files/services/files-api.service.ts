import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesApiService {
  constructor(private readonly http: HttpClient) {
  }

  uploadFile(file: File): Observable<Response> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<Response>('http://127.0.0.1:8080/api/storage/upload', formData);
  }
}
