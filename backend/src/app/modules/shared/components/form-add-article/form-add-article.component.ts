import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../models/article.model';
import { LookArticleAssociationType } from '../../enums/look-article-association-type.enum';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ArticleService } from 'src/app/modules/core/services/article.service';

@Component({
  selector: 'app-htw-form-add-article',
  templateUrl: './form-add-article.component.html',
  styleUrls: ['./form-add-article.component.css']
})
export class FormAddArticleComponent implements OnInit {

  @Input() rank: number;
  @Input() lookArticleAssociationType: LookArticleAssociationType;
  @Output() saveArticle = new EventEmitter();

  article = new Article();

  imageArticlePath: SafeResourceUrl;

  articleId: number;
  articlePrice: number;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.article.lookArticleAssociationType = this.lookArticleAssociationType;
    this.article.rank = this.rank;
  }

  initIndexImagePrincipal() {
    if(this.article &&
      this.article.images &&
      this.article.images.length &&
      !this.article.indexImagePrincipal) {
      this.article.indexImagePrincipal = 0;
    }
  }

  onSave(){
    this.emitSaveArticle();
  }

  onSearch(){
    if(this.articleId > 0) {
      this.articleService.getLookById(this.articleId)
      .subscribe(
        (response: Article) => {
          this.article = response;
          this.article.lookArticleAssociationType = this.lookArticleAssociationType;
          this.article.rank = this.rank;
          this.initIndexImagePrincipal(); 
          console.log(JSON.stringify(this.article, undefined, 4));
        },
        error => console.error(error)
      )
    } else {
      console.error('Article id not found : ', this.articleId);
    }
  }

  private emitSaveArticle() {
    this.saveArticle.emit(this.article); 
  }

  onSelectPrincipalImageChange(indexImagePrincipal : number){
    this.article.indexImagePrincipal = indexImagePrincipal;
  }

}
