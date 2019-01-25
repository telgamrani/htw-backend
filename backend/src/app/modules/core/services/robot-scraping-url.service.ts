import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RobotScrapingUrl } from '../../shared/models/robot-scraping-url.model';
import { RobotScrapingGetResourceByUrlRequest } from '../../shared/requests/robot-scraping-get-resource-by-url-request.request';
import { resolve } from 'path';
import { reject } from 'q';
import { error } from '@angular/compiler/src/util';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RobotScrapingUrlService {

  private robotScrapingUrl = environment.api.concat('/robot/scraping/url');
  private getAll = '/get/all';
  private getResource = '/get/resource';

  private domparser = new DOMParser();

  constructor(private http: HttpClient) { }

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

  getElementsByRegexp(data: string, regexp: RegExp): RegExpMatchArray  {
    const output = new Array();
    let matches;
    while((matches = regexp.exec(data)) !== null){
      output.push(matches[1]);
    } 
    return output;
  }

}
