import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieForm } from './movieForm';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  postUserForm(movieForm: MovieForm): Observable<any> {
    return this.http.post('/api/userForm', movieForm/*, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}*/);
  }

}
