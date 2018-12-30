import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../types/article.model';
import { LookArticleAssociationType } from '../../enums/look-article-association-type.enum';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileUtilService } from '../../utils/file-util.service';

@Component({
  selector: 'app-htw-form-add-article',
  templateUrl: './form-add-article.component.html',
  styleUrls: ['./form-add-article.component.css']
})
export class FormAddArticleComponent implements OnInit {

  article = new Article();

  imageArticlePath: SafeResourceUrl;
  articlePrice: number;

  @Input() rank: number;
  @Input() lookArticleAssociationType: LookArticleAssociationType;

  @Output() saveArticle = new EventEmitter()

  constructor(
    private sanitizer: DomSanitizer,
    private fileUtil: FileUtilService
  ) { }

  ngOnInit() {
    this.article.lookArticleAssociationType = this.lookArticleAssociationType;
    this.article.rank = this.rank;
  }

  onSave(){
    let articleTmp = new Article();
    articleTmp = Object.assign(articleTmp, this.article);
    this.saveArticle.emit(articleTmp);
  }

  onFileImageArticle(fileImageArticle) {
    this.fileUtil.convertFileToString(fileImageArticle.target).then(
      (response : string | ArrayBuffer) => {
        this.article.imgString = response.toString();
        this.imageArticlePath = this.sanitizer.bypassSecurityTrustUrl(this.article.imgString.toString());
      }
    )
  }

}
