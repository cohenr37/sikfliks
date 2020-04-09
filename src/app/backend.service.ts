import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieForm } from './movieForm';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  postTheater(movieForm: MovieForm): Observable<any> {
    return this.http.post('/api/theater', movieForm);
  }

  postMovie(movieForm: MovieForm): Observable<any> {
    return this.http.post('/api/movie', movieForm);
  }
}
