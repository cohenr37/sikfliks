import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';
import { InstaResponse } from 'src/models/insta.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  instas: InstaResponse;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getInstaData().subscribe((instas) => {
      this.instas = instas;
    });
  }

  title = 'sikfliks';
}
