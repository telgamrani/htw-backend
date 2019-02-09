import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Article } from '../../models/article.model';
import { PriceUtilService } from '../../utils/price-util.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-htw-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnChanges {

  @Input() article: Article;

  priceWholePart: string;
  priceDecimalPart: string;
  imageArticleBase64: SafeResourceUrl;

  get imageArticlePath() {
    return (this.article && this.article.images && this.article.images.length > 4) 
            ? this.article.images[3] 
            : this.article.images[0];
  }

  constructor(
    private _sanitizer: DomSanitizer,
    private _priceUtil: PriceUtilService
    ) { }

  ngOnInit() {
    if(!this.article) {
      this._initArticle();
    } else {
      this._initPriceWholeAndDecimalPart();
    }
  }

  private _initArticle() {
    this.article = new Article();
    this.article.brand = '_Brand brand_';
    this.priceWholePart = '_00';
    this.priceDecimalPart = '00_';
    this.article.description = '_Description - description_';
  }

  private _initPriceWholeAndDecimalPart() {
    const priceWholeAndDecimalPart = this._priceUtil.getWholeAndDecimalPart(this.article.price);
    this.priceWholePart = priceWholeAndDecimalPart.wholePart;
    this.priceDecimalPart = priceWholeAndDecimalPart.decimalPart;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['article'] && changes['article'].currentValue) {
      const priceWholeAndDecimalPart = this._priceUtil.getWholeAndDecimalPart(changes['article'].currentValue.price);
      this.priceWholePart = priceWholeAndDecimalPart.wholePart;
      this.priceDecimalPart = priceWholeAndDecimalPart.decimalPart;
      // if(this.article.imgString) {
      //   this.imageArticleBase64 = this._sanitizer.bypassSecurityTrustUrl(this.article.imgString.toString());
      // }
    }
  }

}
