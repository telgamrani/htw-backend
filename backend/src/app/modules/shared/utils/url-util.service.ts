import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlUtilService {

  constructor() { }

  getUrlBaseName(url: string) {
    let urlBaseName: string;
    if(url) {
      const pathArray = url.split( '/' );
      if(pathArray.length > 1) {
        const protocol = pathArray[0];
        const host = pathArray[2];
        urlBaseName = protocol + '//' + host;
      }
    }
    return urlBaseName;
  }

}
