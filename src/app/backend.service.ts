import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { MovieForm } from './movieForm';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private isSubmitted = false;
  private isLoading = false;
  private data;

  private stateSubject = new BehaviorSubject({ isSubmitted: this.isSubmitted, isLoading: this.isLoading, data: this.data });
  public currentState = this.stateSubject.asObservable();

  constructor(private http: HttpClient) {}

  postUserForm(movieForm: MovieForm) {
    this.isSubmitted = true;
    this.isLoading = true;
    this.stateSubject.next({ isSubmitted: this.isSubmitted, isLoading: this.isLoading, data: this.data });
    this.http.post('/api/userForm', movieForm).subscribe(data => {
      this.isLoading = false;
      this.data = data;
      this.stateSubject.next({ isSubmitted: this.isSubmitted, isLoading: this.isLoading, data: this.data });
    });
  }

}
