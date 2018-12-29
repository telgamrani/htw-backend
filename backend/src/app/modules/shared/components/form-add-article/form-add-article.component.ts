import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-htw-form-add-article',
  templateUrl: './form-add-article.component.html',
  styleUrls: ['./form-add-article.component.css']
})
export class FormAddArticleComponent implements OnInit {

  @Input() rank: number;
  @Input() articleTypeRelativeToLook: string;

  constructor() { }

  ngOnInit() {
  }

}
