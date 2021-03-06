import { Component, OnInit} from '@angular/core';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public response:any;

  public state$ = this.backendService.currentState;

  constructor(private backendService: BackendService) { }

  ngOnInit() {}
}
