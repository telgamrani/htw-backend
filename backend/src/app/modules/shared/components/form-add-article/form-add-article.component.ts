import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../types/article.model';
import { LookArticleAssociation } from '../../enums/look-article-association.enum';
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

  @Input() rank: number;
  @Input() lookArticleAssociation: LookArticleAssociation;

  @Output() saveArticle = new EventEmitter()

  constructor(
    private sanitizer: DomSanitizer,
    private fileUtil: FileUtilService
  ) { }

  ngOnInit() {
    this.article.lookArticleAssociation = this.lookArticleAssociation;
    this.article.rank = this.rank;
  }

  onSave(){
    this.saveArticle.emit(this.article);
  }

  onFileImageArticle(fileImageArticle) {
    this.fileUtil.convertFileToString(fileImageArticle.target).then(
      (response : string | ArrayBuffer) => {
        this.article.imgString = response;
        this.imageArticlePath = this.sanitizer.bypassSecurityTrustUrl(''+this.article.imgString);
      }
    )
  }

}
