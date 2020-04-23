import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-theater-tables',
  templateUrl: './theater-tables.component.html',
  styleUrls: ['./theater-tables.component.scss']
})
export class TheaterTablesComponent implements OnInit {

  @Input() response;

  constructor() { }

  ngOnInit() {
  }

}
