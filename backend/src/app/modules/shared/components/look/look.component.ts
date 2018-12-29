import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-htw-look',
  templateUrl: './look.component.html',
  styleUrls: ['./look.component.css']
})
export class LookComponent implements OnInit {

  @Input() moreChoiceButtonEnabled = true;
 
  constructor() { }

  ngOnInit() {
  }

}
