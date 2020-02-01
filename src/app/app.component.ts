import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  employees: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData().subscribe(employees => {
      console.log(employees);
      this.employees = employees;
    });
  }

  getData() {
    return this.http.get('/api/employees');
  }

  title = 'sikfliks';
}
