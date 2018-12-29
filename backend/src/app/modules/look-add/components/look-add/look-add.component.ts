import { Component, OnInit } from '@angular/core';
import { LookArticleAssociation } from 'src/app/modules/shared/enums/look-article-association.enum';
import { Article } from 'src/app/modules/shared/types/article.model';
import { AddLookRequest } from 'src/app/modules/shared/requests/add-look-request.request';
import { Look } from 'src/app/modules/shared/types/look.model';

@Component({
  selector: 'app-htw-look-add',
  templateUrl: './look-add.component.html',
  styleUrls: ['./look-add.component.css']
})
export class LookAddComponent implements OnInit {

  addLookRequest = new AddLookRequest();

  public lookArticleAssociation = LookArticleAssociation;

  constructor() { }

  ngOnInit() {
    this.addLookRequest.look = new Look();
    this.addLookRequest.look.articles = new Array<Article>();
  }

  counter(size: number) {
    return new Array(size);
  }

  onSaveArticle(article: Article) {
    console.log('onSaveArticle : article ', JSON.stringify(article, undefined, 4));
    console.log('article.imgFile', article.imgFile);
    

    this._addOrUpdateArticleOnAddLookRequest(article);

    console.log('onSaveArticle : addlookRequest ', JSON.stringify(this.addLookRequest, undefined, 4));
  }

  private _addOrUpdateArticleOnAddLookRequest(article: Article) {
    let foundIndex = -1;

    foundIndex = this.addLookRequest.look.articles.findIndex((a: Article) => a.rank === article.rank);

    if(foundIndex > -1) {
      this.addLookRequest.look.articles[foundIndex] = article;
    } else {
      this.addLookRequest.look.articles.push(article);
    }
  }

}
