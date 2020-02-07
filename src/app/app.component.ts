import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  employees: any;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getInstaData().subscribe((employees) => {
      this.employees = employees;
    });
  }

  title = 'sikfliks';
}
