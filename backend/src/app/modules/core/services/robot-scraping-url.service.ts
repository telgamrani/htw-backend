import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RobotScrapingUrl } from '../../shared/models/robot-scraping-url.model';
import { RobotScrapingGetResourceByUrlRequest } from '../../shared/requests/robot-scraping-get-resource-by-url-request.request';
import { Subject } from 'rxjs';
import { Article } from '../../shared/models/article.model';
import { ArticleService } from './article.service';
import { AddArticleRequest } from '../../shared/requests/add-article.request';
import { RobotScrapingSelector } from '../../shared/models/robot-scraping-selector.model';
import * as _ from 'lodash';
import { SelectorType } from '../../shared/enums/selector-type.enum';
import { NumberOfElements } from '../../shared/enums/number-of-elements.enum';
import { ElementTarget } from '../../shared/enums/element-target.enum';
import { UrlUtilService } from '../../shared/utils/url-util.service';

const nbrPagePlaceholder = '#__pageNumber__#';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RobotScrapingUrlService {

  private newArticleFoundedSubject = new Subject<Article>();
  newArticleFounded$ = this.newArticleFoundedSubject.asObservable();
  private currentPathInScrapingSubject = new Subject<string>();
  currentPathInScraping$ = this.currentPathInScrapingSubject.asObservable();

  private robotScrapingUrl = environment.api.concat('/robot/scraping/url');
  private getAll = '/get/all';
  private getResource = '/get/resource';

  private domparser = new DOMParser();

  constructor(
      private http: HttpClient,
      private articleService: ArticleService,
      private urlUtil: UrlUtilService
  ) { }

  getAllUrls() {
    return this.http.get<Array<RobotScrapingUrl>>(this.robotScrapingUrl.concat(this.getAll));
  }

  getResourceByUrl(robotScrapingGetResourceByUrlRequest: RobotScrapingGetResourceByUrlRequest) {
    const promise = new Promise<string>( (resolve, reject) => {
      this.http.post(this.robotScrapingUrl.concat(this.getResource), robotScrapingGetResourceByUrlRequest, {responseType: 'text'} ).subscribe(
        (response: string) => resolve(response),
        error => console.log('getResourceByUrl', error)
      );
    });
    return promise;
  }

  getElementsByClassName(data: string, className: string): HTMLCollectionOf<Element> {
    if(className) {
      const domdoc = this.domparser.parseFromString(data, 'text/html');
      const result = domdoc.getElementsByClassName(className);
      return result;
    }
  }

  getElementById(data: string, id: string): HTMLElement {
    if(id) {
      const domdoc = this.domparser.parseFromString(data, 'text/html');
      const result = domdoc.getElementById(id);
      return result;
    }
  }

  getElementByTagName(data: string, tagName: string): HTMLCollectionOf<Element> {
    if(tagName) {
      const domdoc = this.domparser.parseFromString(data, 'text/html');;
      const result = domdoc.getElementsByTagName(tagName);
      return result;
    }
  }

  getElementByRegexp(data: string, regexp: RegExp): RegExpMatchArray  {
    if(regexp) {
      return regexp.exec(data);
    }
  }

  getElementsByRegexp(data: string, regexp: RegExp, withoutDuplicate = false): Array<string>  {
    const output = new Array<string>();
    let matches;
    while((matches = regexp.exec(data)) !== null){
      if(withoutDuplicate && output.includes(matches[1])) {
        continue;
      }
      output.push(matches[1]);
    } 
    return output;
  }

  getPagesCount(data: any, selectors: Array<RobotScrapingSelector>): number {
    let dataTemp: any;
    let pagesCount = 0;
    if(selectors && selectors.length > 0) {
      _.sortBy(selectors, ['rank']).forEach(s => {
        dataTemp = this.executeFunction(data, s.type, s.selector, s.numberOfElements, s.flags);
        data = dataTemp;
      });

      if(data && Array.isArray(data) && data.length >= 1) {
        pagesCount = data[1];
      }
    }

    return pagesCount;
  }

  getPageUrlByNumber(url: string, selector: string, pageNumber: number): string {
    let urlPage: string;
    if(url && selector && pageNumber) {
      urlPage = url.concat(selector);
      urlPage = urlPage.replace(nbrPagePlaceholder, pageNumber.toString());
    }
    return urlPage;
  }

  getPagesDetailUrls(data: any, selectors: Array<RobotScrapingSelector>, url: string): Array<string>{
    let dataTemp: any;
    let urls = new Array<string>();
    if(selectors && selectors.length > 0) {
      _.sortBy(selectors, ['rank']).forEach(s => {
        dataTemp = this.executeFunction(data, s.type, s.selector, s.numberOfElements, s.flags);
        data = dataTemp;
      });

      if(data) {
        for (let index = 0; index < data.length; index++) {
          if (data[index]) {
            const anchorElement = data[index] as HTMLAnchorElement;
            if (!anchorElement.pathname.toLowerCase().startsWith('http')) {
              const urlBaseName = this.urlUtil.getBaseName(url);
              if (urlBaseName) {
                urls.push(urlBaseName.concat(anchorElement.pathname));
              } else {
                console.error('Url base name not found !');
              }
            } else {
              urls.push(anchorElement.pathname);
            }
          }
        }
      }
    }

    return urls;
  }

  getArticlesDataDelimiter(data: string, selectors: Array<RobotScrapingSelector>){
    let dataTemp: any;
    let articlesData: string;
    if(selectors && selectors.length > 0) {
      _.sortBy(selectors, ['rank']).forEach(s => {
        dataTemp = this.executeFunction(data, s.type, s.selector, s.numberOfElements, s.flags);
        data = dataTemp;
      });
      articlesData = data;
    }

    return articlesData;    
  }

  getArticleBrand(data: string, selectors: Array<RobotScrapingSelector>) {
    let dataTemp: any;
    let brand: string;
    if(selectors && selectors.length > 0) {
      _.sortBy(selectors, ['rank']).forEach(s => {
        dataTemp = this.executeFunction(data, s.type, s.selector, s.numberOfElements, s.flags);
        data = dataTemp;
      });

      if(data && Array.isArray(data) && data.length >= 1) {
        brand = data[1];
      }
    }

    return brand;    
  }

  getArticleDescription(data: string, selectors: Array<RobotScrapingSelector>) {
    let dataTemp: any;
    let description: string;
    if(selectors && selectors.length > 0) {
      _.sortBy(selectors, ['rank']).forEach(s => {
        dataTemp = this.executeFunction(data, s.type, s.selector, s.numberOfElements, s.flags);
        data = dataTemp;
      });

      if(data && Array.isArray(data) && data.length >= 1) {
        description = data[1];
      }
    }

    return description;    
  }

  getArticlePrice(data: string, selectors: Array<RobotScrapingSelector>) {
    let dataTemp: any;
    let price: number;
    if(selectors && selectors.length > 0) {
      _.sortBy(selectors, ['rank']).forEach(s => {
        dataTemp = this.executeFunction(data, s.type, s.selector, s.numberOfElements, s.flags);
        data = dataTemp;
      });

      if(data && Array.isArray(data) && data.length >= 1) {
        price = Number.parseFloat(data[1].replace(',','.'));
      }
    }

    return price;    
  }

  getArticleColor(data: string, selectors: Array<RobotScrapingSelector>) {
    let dataTemp: any;
    let color: string;
    if(selectors && selectors.length > 0) {
      _.sortBy(selectors, ['rank']).forEach(s => {
        dataTemp = this.executeFunction(data, s.type, s.selector, s.numberOfElements, s.flags);
        data = dataTemp;
      });

      if(data && Array.isArray(data) && data.length >= 1) {
        color = data[1];
      }
    }

    return color;    
  }

  getArticleSizes(data: any, selectors: Array<RobotScrapingSelector>) {
    let dataTemp: any;
    let sizes: Array<string>;
    if(selectors && selectors.length > 0) {
      _.sortBy(selectors, ['rank']).forEach(s => {
        dataTemp = this.executeFunction(data, s.type, s.selector, s.numberOfElements, s.flags, true);
        data = dataTemp;
      });
      sizes = data;
    }

    return sizes;    
  }

  getArticleImages(data: any, selectors: Array<RobotScrapingSelector>) {
    let dataTemp: any;
    let images: Array<string>;
    if(selectors && selectors.length > 0) {
      _.sortBy(selectors, ['rank']).forEach(s => {
        dataTemp = this.executeFunction(data, s.type, s.selector, s.numberOfElements, s.flags, true);
        data = dataTemp;
      });
      images = data;
    }

    return images;    
  }

  getArticle(data: string, robotScrapingUrl: RobotScrapingUrl, urlSource?: string ): Article {

    const article = new Article();

    // resource (10)
    let selectors = _.filter(robotScrapingUrl.selectors, {'elementTarget': ElementTarget.ARTICLES_DATA_DELIMITER});
    const articlesData = this.getArticlesDataDelimiter(data, selectors);

    // console.log(articlesData);

    // get element : brand
    selectors = _.filter(robotScrapingUrl.selectors, {'elementTarget': ElementTarget.ARTICLE_BRAND});
    const brand = this.getArticleBrand(articlesData, selectors);
    article.brand = brand;
    // console.log('brand : ', brand);

    // get element : description
    selectors = _.filter(robotScrapingUrl.selectors, {'elementTarget': ElementTarget.ARTICLE_DESCRIPTION});
    const description = this.getArticleDescription(articlesData, selectors);
    article.description = description;
    // console.log('description : ', description);

    // get element : price
    selectors = _.filter(robotScrapingUrl.selectors, {'elementTarget': ElementTarget.ARTICLE_PRICE});
    const price = this.getArticlePrice(articlesData, selectors);
    article.price = price;
    console.log('price : ', price);
    
    // get element : shopping url 
    article.shoppingUrl = urlSource;
    console.log('shoppingUrl : ',urlSource);

    // get element : shopping site name
    article.shoppingSiteName = this.urlUtil.getSiteName(article.shoppingUrl);
    console.log('shoppingSiteName : ', article.shoppingSiteName);

    // get element : color 
    selectors = _.filter(robotScrapingUrl.selectors, {'elementTarget': ElementTarget.ARTICLE_COLOR});
    const color = this.getArticleColor(articlesData, selectors);
    article.color = color;
    // console.log('color : ', color);

    // get element : sizes
    selectors = _.filter(robotScrapingUrl.selectors, {'elementTarget': ElementTarget.ARTICLE_SIZES});
    const sizes = this.getArticleSizes(articlesData, selectors);
    article.sizes = sizes;
    // console.log('sizes : ', sizes.join(' | '));

    // get element : categories
    if(robotScrapingUrl.categories) {
      const categories = new Array<string>();
      robotScrapingUrl.categories.forEach(c => {
        categories.push(c.category);
      });
      article.categories = categories;
    }

    // get element : images
    selectors = _.filter(robotScrapingUrl.selectors, {'elementTarget': ElementTarget.ARTICLE_IMAGES});
    const images = this.getArticleImages(articlesData, selectors);
    article.images = images.splice(0,5);
    // console.log('imgs : ', article.images.join(' ====== '));

    return article;
  }

  executeFunction(
        data: string, 
        type: SelectorType, 
        selector: string, 
        numberOfElements: NumberOfElements,
        flags? : string,
        withoutDuplicate = false
  ) {
      let result;
      if(type === SelectorType.REGEXP && numberOfElements === NumberOfElements.ONE) {

        result = this.getElementByRegexp(data, new RegExp(selector, flags));

      } else if (type === SelectorType.REGEXP && numberOfElements === NumberOfElements.MANY) {

        result = this.getElementsByRegexp(data, new RegExp(selector, flags), withoutDuplicate);
      
      } else if (type === SelectorType.ID_NAME) {

        result = this.getElementById(data, selector);
        if(result) {
          result = result.innerHTML;
        }

      } else if(type === SelectorType.CLASS_NAME) {

        result = this.getElementsByClassName(data, selector);

      }
      return result;
  }

  scrapingArticles(robotScrapingUrls: Array<RobotScrapingUrl>) {
    // urls (1)
    robotScrapingUrls.forEach(async robotScrapingUrl => {

      if(robotScrapingUrl.url && robotScrapingUrl.url.length > 0) {

        const robotScrapingGetResourceByUrlRequest = new RobotScrapingGetResourceByUrlRequest();

        // url (2)
        robotScrapingGetResourceByUrlRequest.url = robotScrapingUrl.url;

        const asyncResponse1 = await this.getResourceByUrl(robotScrapingGetResourceByUrlRequest);
        if(asyncResponse1) {

          // resource (3) + get pages number (4)
          let selectors = _.filter(robotScrapingUrl.selectors, {'elementTarget': ElementTarget.PAGES_COUNT});
          const nbrPages = this.getPagesCount(asyncResponse1, selectors);
          console.log('pages count : ', nbrPages);
          
          // urls (5)
          for (let nbrPage = 1; nbrPage <= nbrPages; nbrPage++) {
            selectors = _.filter(robotScrapingUrl.selectors, {'elementTarget': ElementTarget.PAGE_URL_BY_NUMBER});
            if(selectors.length > 0) {
              const pageUrl = this.getPageUrlByNumber(robotScrapingUrl.url, selectors[0].selector, nbrPage);
              console.log('pageUrl : ', nbrPage,pageUrl);

              // send current path in scraping
              this.currentPathInScraping(pageUrl);

              // resource (7)
              robotScrapingGetResourceByUrlRequest.url = pageUrl;
              const asyncResponse2 = await this.getResourceByUrl(robotScrapingGetResourceByUrlRequest);
              if(asyncResponse2) {
                // urls (8)
                selectors = _.filter(robotScrapingUrl.selectors, {'elementTarget': ElementTarget.PAGES_DETAIL_URLS});
                const pageDetailUrls = this.getPagesDetailUrls(asyncResponse2, selectors, pageUrl);
                // console.log(pageDetailUrls.join(' || '));
                
                pageDetailUrls.forEach( async url => {
                  robotScrapingGetResourceByUrlRequest.url = url;
                  const asyncResponse3 = await this.getResourceByUrl(robotScrapingGetResourceByUrlRequest);
                  if(asyncResponse3) {
                    
                    const article = this.getArticle(asyncResponse3, robotScrapingUrl, url);
                    
                    // TODO : A supprimer /  refaire
                    article.imgUrl = article.images[3];
                    if(article.images.length < 4) {
                      article.imgUrl = article.images[0];
                    }

                    // send new article
                    this.newArticleFounded(article);

                    // save new article on db
                    const addArticleRequest = new AddArticleRequest();
                    addArticleRequest.article = article;
                    this.articleService.addArticle(addArticleRequest).subscribe(
                      response => console.log('succes add'+ article.id),
                      error => console.log('error add')
                    );
                    
                  }
                });

              }
            }
          }
        }
      }
    });
  }

  // TODO : a supprimer
  _scrapingArticles(robotScrapingUrls: Array<RobotScrapingUrl>) {
    // urls (1)
    robotScrapingUrls.forEach(async robotScrapingUrl => {

      if(robotScrapingUrl.url && robotScrapingUrl.url.length > 0) {

        const robotScrapingGetResourceByUrlRequest = new RobotScrapingGetResourceByUrlRequest();

        // url (2)
        robotScrapingGetResourceByUrlRequest.url = robotScrapingUrl.url;

        const asyncResponse1 = await this.getResourceByUrl(robotScrapingGetResourceByUrlRequest);
        if(asyncResponse1) {

              // resource (3) + get nbr page (4)
              const nbrPagesData = this.getElementById(asyncResponse1, 'z-nvg-cognac-props'); // TODO -- db
            
              if(nbrPagesData) {

                const nbrPagesMatch = this.getElementByRegexp(nbrPagesData.innerHTML, new RegExp(/"page_count":([0-9]+),/, 'img')); // TODO -- db
                
                if(nbrPagesMatch && Array.isArray(nbrPagesMatch) && nbrPagesMatch.length >= 1) {
                  const nbrPages: number = Number.parseInt(nbrPagesMatch[1]);

                  // urls (5)
                  for (let nbrPage = 1; nbrPage <= nbrPages; nbrPage++) {
                    let urlPage = robotScrapingUrl.url; // TODO -- db
                    urlPage = urlPage.concat('/?p=#__nbrPage__#'); // TODO -- db

                    // url (6)
                    urlPage = urlPage.replace(nbrPagePlaceholder, nbrPage.toString());
                    console.log(urlPage);

                    // send current path in scraping
                    this.currentPathInScraping(urlPage);

                    // resource (7)
                    robotScrapingGetResourceByUrlRequest.url = urlPage;
                    const asyncResponse2 = await this.getResourceByUrl(robotScrapingGetResourceByUrlRequest);
                    if(asyncResponse2) {
                        // console.log(this.getElementsByClassName(response, 'cat_imageLink-OPGGa'));
                        // urls (8)
                        const pageDetailUrlsData = this.getElementsByClassName(asyncResponse2, 'cat_imageLink-OPGGa'); // TODO -- db
                        
                        if(pageDetailUrlsData && pageDetailUrlsData.length > 0) {
                          for( let indexUrl = 0; indexUrl < pageDetailUrlsData.length; indexUrl++) {
                            // url (9)
                            const pageDetailUrl = pageDetailUrlsData[indexUrl] as HTMLAnchorElement;
                            const shopingSiteBaseUrl = 'https://zalando.fr';  // TODO -- db
                            robotScrapingGetResourceByUrlRequest.url = shopingSiteBaseUrl.concat(pageDetailUrl.pathname);
                            console.log(robotScrapingGetResourceByUrlRequest.url);
                            
                            const asyncResponse3 = await this.getResourceByUrl(robotScrapingGetResourceByUrlRequest);
                            if(asyncResponse3) {

                              const article = new Article();

                              // resource (10)
                              const articleData = this.getElementById(asyncResponse3, 'z-vegas-pdp-props') // TODO -- db
                              
                              // get element : brand
                              const brandMatch = this.getElementByRegexp(articleData.innerHTML, new RegExp(/"brand":{"name":"(.+?)","code"/, 'img')); // TODO -- db
                              if(brandMatch && Array.isArray(brandMatch) && brandMatch.length >= 1) {
                                console.log('brand : ', brandMatch[1]);
                                article.brand = brandMatch[1];
                              }

                              // get element : description
                              const descriptionMatch = this.getElementByRegexp(articleData.innerHTML, new RegExp(/"name":"(.+?)","color"/, 'i')); // TODO -- db
                              if(descriptionMatch && Array.isArray(descriptionMatch) && descriptionMatch.length >= 1) {
                                console.log('description : ', descriptionMatch[1]);
                                article.description = descriptionMatch[1];
                              }

                              // get element : price
                              const priceMatch = this.getElementByRegexp(articleData.innerHTML, new RegExp(/"price":{"currency":"EUR","value":([0-9.]+?),/, 'img')); // TODO -- db
                              if(priceMatch && Array.isArray(priceMatch) && priceMatch.length >= 1) {
                                console.log('price : ', Number.parseFloat(priceMatch[1].replace(',','.'))); 
                                  article.price = Number.parseFloat(priceMatch[1].replace(',','.'));
                              }

                              // get element : shopping url
                              const shoppingUrl = robotScrapingGetResourceByUrlRequest.url;
                              console.log('shoppingUrl : ',shoppingUrl);
                              article.shoppingUrl = shoppingUrl;


                              // get element : color
                              const colorMatch = this.getElementByRegexp(articleData.innerHTML, new RegExp(/"color":"(.+?)","silhouette_code"/, 'img')); // TODO -- db
                              console.log('color : ', colorMatch[1]);
                              article.color = colorMatch[1];

                              // get element : sizes
                              const sizes = this.getElementsByRegexp(articleData.innerHTML, new RegExp(/"size":{"local":"(\w+)","local_type"/,'img'), true); // TODO -- db
                              console.log('sizes : ', sizes.join(' | '));
                              article.sizes = sizes;

                              // get element : imgs
                              let imgs = this.getElementsByRegexp(articleData.innerHTML, new RegExp(/"zoom":"(([\d\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.])+)"}}/, 'img'), true); // TODO -- db
                              // only frist 5 elements
                              imgs = imgs.splice(0,5);
                              console.log('imgs : ', imgs.join(' ====== '));
                              article.images = imgs;
                              // TODO : A supprimer
                              article.imgUrl = imgs[3];
                              if(imgs.length < 4) {
                                article.imgUrl = imgs[0];
                              }

                              // send article
                              this.newArticleFounded(article);

                              // save article on db
                              const addArticleRequest = new AddArticleRequest();
                              addArticleRequest.article = article;
                              this.articleService.addArticle(addArticleRequest).subscribe(
                                response => console.log('succes add'+ article.id),
                                error => console.log('error add')
                              );
                            }

                          }
                        }

                    }

                  }

                }

              }
              
          }
      }

    });    
  }

  newArticleFounded(article: Article) {
    this.newArticleFoundedSubject.next(article);
  }

  currentPathInScraping(path: string) {
    this.currentPathInScrapingSubject.next(path);
  }

}
