import { Component, OnInit } from '@angular/core';
import { LookArticleAssociationType } from 'src/app/modules/shared/enums/look-article-association-type.enum';
import { Article } from 'src/app/modules/shared/models/article.model';
import { AddLookRequest } from 'src/app/modules/shared/requests/add-look-request.request';
import { Look } from 'src/app/modules/shared/models/look.model';
import { FileUtilService } from 'src/app/modules/shared/utils/file-util.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { JsonUtilService } from 'src/app/modules/shared/utils/json-util.service';
import { LookService } from 'src/app/modules/core/services/look.service';

@Component({
  selector: 'app-htw-look-add',
  templateUrl: './look-add.component.html',
  styleUrls: ['./look-add.component.css']
})
export class LookAddComponent implements OnInit {

  addLookRequest = new AddLookRequest();

  imageLookPath: SafeResourceUrl;

  public lookArticleAssociationType = LookArticleAssociationType;

  constructor(
    private sanitizer: DomSanitizer,
    private fileUtil: FileUtilService,
    private jsonUtil: JsonUtilService,
    private lookService: LookService
  ) {}

  ngOnInit() {
    this.addLookRequest.look = new Look();
    this.addLookRequest.look.articles = new Array<Article>();
  }

  counter(size: number) {
    return new Array(size);
  }

  getArticleByRankAndLookArticleAssociationType(rank: number, lookArticleAssociationType: LookArticleAssociationType){

    let article;

    const foundIndex = this._getArticleIndexByRank(rank, lookArticleAssociationType);

    if(foundIndex > -1) {
      article = this.addLookRequest.look.articles[foundIndex];
    }

    return article;
  }

  onSaveArticle(article: Article) {
    this._addOrUpdateArticleOnAddLookRequest(article);
    console.log('onSaveArticle : addlookRequest ', JSON.stringify(this.addLookRequest, undefined, 4));
  }

  onFileImageLook(fileImageLook) {
    this.fileUtil.convertFileToString(fileImageLook.target).then(
      (response : string | ArrayBuffer) => {
        this.addLookRequest.look.imgString = response.toString();
        this.imageLookPath = this.sanitizer.bypassSecurityTrustUrl(this.addLookRequest.look.imgString.toString());
      }
    );
    return false;
  }

  private _addOrUpdateArticleOnAddLookRequest(article: Article) {

    if(!article) {
      return;
    }

    const foundIndex = this._getArticleIndexByRank(article.rank, article.lookArticleAssociationType);

    if(foundIndex > -1) {
      this.addLookRequest.look.articles[foundIndex] = article;
    } else {
      this.addLookRequest.look.articles.push(article);
    }
    
  }

  private _getArticleIndexByRank(rank: number, lookArticleAssociationType: LookArticleAssociationType): number {
    let foundIndex = -1;
    foundIndex = this.addLookRequest.look.articles.findIndex((a: Article) => a.rank === rank && a.lookArticleAssociationType === lookArticleAssociationType);
    return foundIndex;
  }

  sendAddLookRequest() {
    const isOk = confirm('êtes-vous sur de vouloir ajouter ce look ?');
    if(isOk) {
      this.lookService.addLook(this.addLookRequest).subscribe(
        response => console.log('success add look'),
        error => console.log('error add look')
      );
    }
    return false;
  }

}
