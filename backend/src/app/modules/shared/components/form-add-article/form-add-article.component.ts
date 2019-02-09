import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../models/article.model';
import { LookArticleAssociationType } from '../../enums/look-article-association-type.enum';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileUtilService } from '../../utils/file-util.service';
import { ArticleService } from 'src/app/modules/core/services/article.service';

@Component({
  selector: 'app-htw-form-add-article',
  templateUrl: './form-add-article.component.html',
  styleUrls: ['./form-add-article.component.css']
})
export class FormAddArticleComponent implements OnInit {

  article = new Article();

  imageArticlePath: SafeResourceUrl;

  articleId: number;
  articlePrice: number;

  @Input() rank: number;
  @Input() lookArticleAssociationType: LookArticleAssociationType;

  @Output() saveArticle = new EventEmitter()

  constructor(
    private articleService: ArticleService,
    private sanitizer: DomSanitizer,
    private fileUtil: FileUtilService
  ) { }

  ngOnInit() {
    this.article.lookArticleAssociationType = this.lookArticleAssociationType;
    this.article.rank = this.rank;
  }

  onSave(){
    this.saveArticle.emit(this.article);
  }

  onSearch(){
    if(this.articleId > 0) {
      this.articleService.getLookById(this.articleId)
      .subscribe(
        (response: Article) => {
          this.article = response;
          this.article.lookArticleAssociationType = this.lookArticleAssociationType;
          this.article.rank = this.rank;
          console.log(JSON.stringify(this.article, undefined, 4));
        },
        error => console.error(error)
      )
    } else {
      console.error('Article id not found : ', this.articleId);
    }
  }

  // TODO A SUPPRIMER / REVOIR
  onFileImageArticle(fileImageArticle) {
    this.fileUtil.convertFileToString(fileImageArticle.target).then(
      (response : string | ArrayBuffer) => {
        this.article.imgString = response.toString();
        this.imageArticlePath = this.sanitizer.bypassSecurityTrustUrl(this.article.imgString.toString());
      }
    )
  }

}
