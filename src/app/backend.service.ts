import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstaResponse } from 'src/models/insta.interface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getInstaData(): Observable<InstaResponse> {
    return this.http.get<InstaResponse>('/api/insta');
  }
}
