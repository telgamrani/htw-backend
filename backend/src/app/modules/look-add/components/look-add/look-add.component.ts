import { Component, OnInit } from '@angular/core';
import { ArticleTypeRelativeToLook } from 'src/app/modules/shared/enums/article-type-relative-to-look.enum';

@Component({
  selector: 'app-htw-look-add',
  templateUrl: './look-add.component.html',
  styleUrls: ['./look-add.component.css']
})
export class LookAddComponent implements OnInit {

  public articleTypeRelativeToLook = ArticleTypeRelativeToLook;

  constructor() { }

  ngOnInit() {
  }

  counter(size: number) {
    return new Array(size);
    ArticleTypeRelativeToLook.Principale
  }

}
