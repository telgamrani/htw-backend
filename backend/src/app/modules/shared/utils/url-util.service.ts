import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlUtilService {

  siteNameRegexp = /(?:\/\/)(?:www\.)?([^/]+)/i;

  constructor() { }

  getBaseName(url: string): string {
    let urlBaseName: string;
    if(url) {
      const pathArray = url.split( '/' );
      if(pathArray.length > 2) {
        const protocol = pathArray[0];
        const host = pathArray[2];
        urlBaseName = protocol + '//' + host;
      }
    }
    return urlBaseName;
  }

  getSiteName(url: string): string {
    let siteName: string;
    if(url) {
      const result = this.siteNameRegexp.exec(url);
      if(result && Array.isArray(result) && result.length > 0) {
        siteName = result[1];
      }
    }
    return siteName;
  }

}
