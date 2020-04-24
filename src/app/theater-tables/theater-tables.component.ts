import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-theater-tables',
  templateUrl: './theater-tables.component.html',
  styleUrls: ['./theater-tables.component.scss']
})
export class TheaterTablesComponent {
  state$ = this.backendService.currentState;

  constructor(private route:ActivatedRoute,
              private backendService: BackendService) { }

}
