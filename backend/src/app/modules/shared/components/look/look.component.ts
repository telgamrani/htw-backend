import { Component, OnInit, Input } from '@angular/core';
import { LookArticleAssociationType } from '../../enums/look-article-association-type.enum';
import { Look } from '../../models/look.model';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Article } from '../../models/article.model';
import { LookService } from 'src/app/modules/core/services/look.service';
import { PublishLookRequest } from '../../requests/publish-look-request.request';

@Component({
  selector: 'app-htw-look',
  templateUrl: './look.component.html',
  styleUrls: ['./look.component.css']
})
export class LookComponent implements OnInit {

  public lookArticleAssociationType = LookArticleAssociationType;
  publishLookRequest = new PublishLookRequest();

  @Input() look: Look;
  @Input() moreChoiceButtonEnabled = true;

  showLook: boolean = true;

  get imageLookPath() {

    if(!this.look) {
      return;
    }
    
    return this._sanitizer.bypassSecurityTrustUrl(environment.imageLookRootPath.concat(this.look.imgUrl));
  }
 
  constructor(
    private lookService: LookService,
    private _sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
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

  deleteLook() {
    const isOk = confirm("êtes-vous sûre de vouloire supprimer ce look ?");
    if(isOk) {
      this.lookService.deleteLookById(this.look.id).subscribe(
        response => {
          console.log('success delete');
          this.showLook = false;
        },
        error => console.log('error delete')
      );
    }
    return false;
  }

  publishLook(isPublished: boolean) {
    const isOk = confirm("êtes-vous sûre de vouloire publier ce look ?");
    if(isOk) {
      this.look.published = isPublished;
      this.publishLookRequest.look = this.look;
      this.publishLookRequest.isPublished = isPublished;
      this.lookService.publishLook(this.publishLookRequest).subscribe(
        response => console.log('success publish'),
        error => console.log('error publish')
      )
    }
  }

}
