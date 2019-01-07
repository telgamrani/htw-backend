import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-htw-loader-indicator-spinner',
  templateUrl: './loader-indicator-spinner.component.html',
  styleUrls: ['./loader-indicator-spinner.component.css']
})
export class LoaderIndicatorSpinnerComponent implements OnInit {

  @Input() show = false;

  constructor() { }

  ngOnInit() {
  }

}
