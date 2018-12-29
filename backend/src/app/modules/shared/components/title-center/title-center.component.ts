import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-htw-title-center',
  templateUrl: './title-center.component.html',
  styleUrls: ['./title-center.component.css']
})
export class TitleCenterComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
