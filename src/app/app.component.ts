import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: any;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getYelpData().subscribe((data) => {
      this.data = JSON.stringify(data, null, 2);
    });
  }

  title = 'sikfliks';
}
