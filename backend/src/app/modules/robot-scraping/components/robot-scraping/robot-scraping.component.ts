import { Component, OnInit } from '@angular/core';
import { RobotScrapingUrlService } from 'src/app/modules/core/services/robot-scraping-url.service';
import { RobotScrapingUrl } from 'src/app/modules/shared/models/robot-scraping-url.model';
import { RobotScrapingGetResourceByUrlRequest } from 'src/app/modules/shared/requests/robot-scraping-get-resource-by-url-request.request';

const nbrPagePlaceholder = '#__nbrPage__#';

@Component({
  selector: 'app-htw-robot-scraping',
  templateUrl: './robot-scraping.component.html',
  styleUrls: ['./robot-scraping.component.css']
})
export class RobotScrapingComponent implements OnInit {

  activatePlayAction = false;
  activatePauseAction = false;

  robotScrapingUrls = new Array<RobotScrapingUrl>();
  robotScrapingUrlCurrentIndex = 0;

  constructor(
      private robotScrapingurlService: RobotScrapingUrlService
  ) { }

  ngOnInit() {
    this.robotScrapingurlService.getAllUrls().subscribe(
      response => this.robotScrapingUrls = response,
      error => console.log('error', error)
    )
  }


  play() {
    this._activatePlayAction();  
    // urls (1)
    this.robotScrapingUrls.forEach(async robotScrapingUrl => { 

      if(robotScrapingUrl.url && robotScrapingUrl.url.length > 0) {

        const robotScrapingGetResourceByUrlRequest = new RobotScrapingGetResourceByUrlRequest();

        // url (2)
        robotScrapingGetResourceByUrlRequest.url = robotScrapingUrl.url;

        const asyncResponse1 = await this.robotScrapingurlService.getResourceByUrl(robotScrapingGetResourceByUrlRequest);
        if(asyncResponse1) {

              // resource (3) + get nbr page (4)
              const nbrPagesData = this.robotScrapingurlService.getElementById(asyncResponse1, 'z-nvg-cognac-props'); // TODO -- db
             
              if(nbrPagesData) {

                const nbrPagesMatch = this.robotScrapingurlService.getElementByRegexp(nbrPagesData.innerHTML, new RegExp(/.*"page_count":([0-9]+),/, 'img')); // TODO -- db
                
                if(nbrPagesMatch && Array.isArray(nbrPagesMatch) && nbrPagesMatch.length >= 1) {
                  const nbrPages: number = Number.parseInt(nbrPagesMatch[1]);
                  
                  // urls (5)
                  for (let nbrPage = 1; nbrPage <= nbrPages; nbrPage++) {
                    let urlPage = robotScrapingUrl.url; // TODO -- db
                    urlPage = urlPage.concat('/?p=#__nbrPage__#'); // TODO -- db

                    // url (6)
                    urlPage = urlPage.replace(nbrPagePlaceholder, nbrPage.toString());
                    console.log(urlPage);

                    // resource (7)
                    robotScrapingGetResourceByUrlRequest.url = urlPage;
                    const asyncResponse2 = await this.robotScrapingurlService.getResourceByUrl(robotScrapingGetResourceByUrlRequest);
                    if(asyncResponse2) {
                        // console.log(this.robotScrapingurlService.getElementsByClassName(response, 'cat_imageLink-OPGGa'));
                        // urls (8)
                        const pageDetailUrlsData = this.robotScrapingurlService.getElementsByClassName(asyncResponse2, 'cat_imageLink-OPGGa'); // TODO -- db
                        
                        if(pageDetailUrlsData && pageDetailUrlsData.length > 0) {
                          for( let indexUrl = 0; indexUrl < pageDetailUrlsData.length; indexUrl++) {
                            // url (9)
                            const pageDetailUrl = pageDetailUrlsData[indexUrl] as HTMLAnchorElement;
                            const shopingSiteBaseUrl = 'https://m.zalando.fr';  // TODO -- db
                            robotScrapingGetResourceByUrlRequest.url = shopingSiteBaseUrl.concat(pageDetailUrl.pathname);
                            console.log(pageDetailUrl.pathname);
                            // debugger
                            const asyncResponse3 = await this.robotScrapingurlService.getResourceByUrl(robotScrapingGetResourceByUrlRequest);
                            if(asyncResponse3) {
                                  // resource (10)
                                  const articleData = this.robotScrapingurlService.getElementById(asyncResponse3, 'z-vegas-pdp-props') // TODO -- db
                                  
                                  // get element : brand
                                  const brandMatch = this.robotScrapingurlService.getElementByRegexp(articleData.innerHTML, new RegExp(/"brand":{"name":"(.+)","code"/, 'img')); // TODO -- db
                                  if(brandMatch && Array.isArray(brandMatch) && brandMatch.length >= 1) {
                                    console.log('brand : ',brandMatch[1]);
                                  }

                                  // get element : description
                                  const descriptionMatch = this.robotScrapingurlService.getElementByRegexp(articleData.innerHTML, new RegExp(/.*"name":"(.+)","color"/, 'img')); // TODO -- db
                                  if(descriptionMatch && Array.isArray(descriptionMatch) && descriptionMatch.length >= 1) {
                                    console.log('description : ',descriptionMatch[1]);
                                  }

                                  // get element : price
                                  const priceMatch = this.robotScrapingurlService.getElementByRegexp(articleData.innerHTML, new RegExp(/"price":{"currency":"EUR","value":([0-9.]+),/, 'img')); // TODO -- db
                                  if(priceMatch && Array.isArray(priceMatch) && priceMatch.length >= 1) {
                                    console.log('price : ',priceMatch[1]); 
                                  }

                                  // get element : shopping url
                                  const shoppingUrl = robotScrapingGetResourceByUrlRequest.url;
                                  console.log('shoppingUrl : ',shoppingUrl);

                                  // get element : color
                                  const colorMatch = this.robotScrapingurlService.getElementByRegexp(articleData.innerHTML, new RegExp(/"color":"(.+)","silhouette_code"/, 'img')); // TODO -- db
                                  console.log('color : ', colorMatch[1]);

                                  // get element : sizes
                                  const sizes = this.robotScrapingurlService.getElementsByRegexp(articleData.innerHTML, new RegExp(/"size":{"local":"(\w+)","local_type"/,'img')); // TODO -- db
                                  console.log('sizes : ', sizes.join(' | '));

                                  // get element : imgs
                                  let imgs = this.robotScrapingurlService.getElementsByRegexp(articleData.innerHTML, new RegExp(/"zoom":"(([\d\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.])+)"}}/, 'img')); // TODO -- db
                                  // obly frist 5 element
                                  imgs = imgs.splice(0,5);
                                  console.log('imgs : ', imgs.join(' ====== '));
                                  
                                  
                                  
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

  pause() {
    this._activatePauseAction();
  }

  private _activatePlayAction() {
    this.activatePlayAction = true;
    this.activatePauseAction = false;
    
  }

  private _activatePauseAction() {
    this.activatePlayAction = false;
    this.activatePauseAction = true;
  }

}
