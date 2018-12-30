import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Look } from '../types/look.model';
import { AddLookRequest } from '../requests/add-look-request.request';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LookService {

  private lookUrl = environment.api.concat('/look');
  private addAction = '/add'

  constructor(private http: HttpClient) {}

  addLook(addLookRequest: AddLookRequest): Observable<Look> {
    return this.http.post<Look>(this.lookUrl.concat(this.addAction), addLookRequest, httpOptions);
  }

} 
