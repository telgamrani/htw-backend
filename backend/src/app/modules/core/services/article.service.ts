import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddArticleRequest } from '../../shared/requests/add-article.request';
import { Article } from '../../shared/models/article.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleUrl = environment.api.concat('/article');
  private actionAdd = '/add';
  private actionGet = '/get';

  constructor(private http: HttpClient) { }

  addArticle(addArticleRequest: AddArticleRequest): Observable<Article> {
    return this.http.post<Article>(this.articleUrl.concat(this.actionAdd), addArticleRequest, httpOptions);
  }
  
  getLookById(id: number): Observable<Article> {
    return this.http.get<Article>(this.articleUrl.concat(this.actionGet+"/"+id), httpOptions);
  }
  
}
