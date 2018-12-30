import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Article } from '../../types/article.model';
import { PriceUtilService } from '../../utils/price-util.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-htw-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnChanges {

  @Input() article: Article;

  priceWholePart: string;
  priceDecimalPart: string;
  imageArticlePath: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private priceUtil: PriceUtilService
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
    const priceWholeAndDecimalPart = this.priceUtil.getWholeAndDecimalPart(this.article.price);
    this.priceWholePart = priceWholeAndDecimalPart.wholePart;
    this.priceDecimalPart = priceWholeAndDecimalPart.decimalPart;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['article'] && changes['article'].currentValue) {
      const priceWholeAndDecimalPart = this.priceUtil.getWholeAndDecimalPart(changes['article'].currentValue.price);
      this.priceWholePart = priceWholeAndDecimalPart.wholePart;
      this.priceDecimalPart = priceWholeAndDecimalPart.decimalPart;
      if(this.article.imgString) {
        this.imageArticlePath = this.sanitizer.bypassSecurityTrustUrl(this.article.imgString.toString());
      }
    }
  }

}
