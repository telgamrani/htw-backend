import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FileUtilService {

  constructor() { }

  convertFileToString(inputValue: any) {
    const promise = new Promise((resolve, reject) => {
      var file: File = inputValue.files[0];
      var myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        resolve(myReader.result);
      }
      myReader.readAsDataURL(file);
    });

    return promise;
  }

}
