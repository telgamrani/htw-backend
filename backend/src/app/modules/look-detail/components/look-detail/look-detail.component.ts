import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookService } from 'src/app/modules/core/services/look.service';
import { Look } from 'src/app/modules/shared/models/look.model';
import { LookArticleAssociationType } from 'src/app/modules/shared/enums/look-article-association-type.enum';
import { Article } from 'src/app/modules/shared/models/article.model';

@Component({
  selector: 'app-htw-look-detail',
  templateUrl: './look-detail.component.html',
  styleUrls: ['./look-detail.component.css']
})
export class LookDetailComponent implements OnInit {

  look: Look;
  public lookArticleAssociationType = LookArticleAssociationType;

  constructor(
    private lookService: LookService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.lookService.getLookFromLookStorageByIdOrDb(id)
    .then(
      response => {
        if(response) {
          this.look = response;
        }
      },
      error => {}
    )
  }

  counter(size: number) {
    return new Array(size);
  }

  getArticleByRankAndLookArticleAssociationType(rank: number, lookArticleAssociationType: LookArticleAssociationType){

    let article;

    const foundIndex = this._getArticleIndexByRank(rank, lookArticleAssociationType);

    if(foundIndex > -1) {
      article = this.look.articles[foundIndex];
    }

    return article;
  }

  private _getArticleIndexByRank(rank: number, lookArticleAssociationType: LookArticleAssociationType): number {
    let foundIndex = -1;
    foundIndex = this.look.articles.findIndex((a: Article) => a.rank === rank && a.lookArticleAssociationType === lookArticleAssociationType);
    return foundIndex;
  }

}
