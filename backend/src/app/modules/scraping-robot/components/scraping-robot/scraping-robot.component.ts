import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-htw-scraping-robot',
  templateUrl: './scraping-robot.component.html',
  styleUrls: ['./scraping-robot.component.css']
})
export class ScrapingRobotComponent implements OnInit {

  activatePlayAction = false;
  activatePauseAction = false;

  constructor() { }

  ngOnInit() {
  }

  play() {
    this._activatePlayAction();
  }

  pause() {
    this._activatePauseAction();
  }

  private _activatePlayAction() {
    this.activatePlayAction = true;
    this.activatePauseAction = false;
    
  }

  private _activatePauseAction() {
    this.activatePlayAction = false;
    this.activatePauseAction = true;
  }

}
