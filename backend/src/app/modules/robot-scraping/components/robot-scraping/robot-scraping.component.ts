import { Component, OnInit } from '@angular/core';
import { RobotScrapingUrlService } from 'src/app/modules/core/services/robot-scraping-url.service';
import { RobotScrapingUrl } from 'src/app/modules/shared/models/robot-scraping-url.model';
import { Article } from 'src/app/modules/shared/models/article.model';

@Component({
  selector: 'app-htw-robot-scraping',
  templateUrl: './robot-scraping.component.html',
  styleUrls: ['./robot-scraping.component.css']
})
export class RobotScrapingComponent implements OnInit {

  activatePlayAction = false;
  activatePauseAction = false;

  robotScrapingUrls = new Array<RobotScrapingUrl>();
  robotScrapingUrlCurrentIndex = 0;

  articles = new Array<Article>();

  currentPathInScraping: string;

  constructor(
      private robotScrapingurlService: RobotScrapingUrlService
  ) { }

  ngOnInit() {

    this.robotScrapingurlService.getAllUrls().subscribe(
      response => this.robotScrapingUrls = response,
      error => console.log('error', error)
    )

    this.robotScrapingurlService.newArticleFounded$.subscribe(
      (response:  Article) => this.articles.unshift(response), 
      error => console.log('error', error)
    )

    this.robotScrapingurlService.currentPathInScraping$.subscribe(
      (response: string) => this.currentPathInScraping = response,
      error => console.log('error', error)
    )
  }

  play() {
    this._activatePlayAction(); 
    this.robotScrapingurlService.scrapingArticles(this.robotScrapingUrls);
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
