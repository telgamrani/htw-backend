import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddLookRequest } from '../../shared/requests/add-look-request.request';
import { Observable } from 'rxjs';
import { Look } from '../../shared/models/look.model';
import { UpdateLookRequest } from '../../shared/requests/update-look-request.request';
import { PublishLookRequest } from '../../shared/requests/publish-look-request.request';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LookService {

  looksStorage: Array<Look>;

  private lookUrl = environment.api.concat('/look');
  private actionAdd = '/add';
  private actionGet = '/get';
  private actionGetAll = '/get/all';
  private actionDelete = '/delete';
  private actionUpdate = '/update';
  private actionPublish = '/publish';
  private size = 8;

  constructor(private http: HttpClient) {}

  addLook(addLookRequest: AddLookRequest): Observable<Look> {
    return this.http.post<Look>(this.lookUrl.concat(this.actionAdd), addLookRequest, httpOptions);
  }

  updateLook(updateLookRequest: UpdateLookRequest): Observable<Look> {
    return this.http.put<Look>(this.lookUrl.concat(this.actionUpdate), updateLookRequest, httpOptions);
  }

  publishLook(publishLookRequest: PublishLookRequest): Observable<Look> {
    return this.http.put<Look>(this.lookUrl.concat(this.actionPublish), publishLookRequest, httpOptions);
  }

  getLooks() : Observable<Array<Look>> {
    return this.http.get<Array<Look>>(this.lookUrl.concat(this.actionGetAll), httpOptions);
  }

  getLooksByPage(page:number) : Observable<Array<Look>> {
    return this.http.get<Array<Look>>(this.lookUrl.concat(this.actionGetAll+"/"+page+"/"+this.size), httpOptions);
  }

  getLookById(id: number): Observable<Look> {
    return this.http.get<Look>(this.lookUrl.concat(this.actionGet+"/"+id), httpOptions);
  }

  deleteLookById(id: number) {
    return this.http.delete(this.lookUrl.concat(this.actionDelete+"/"+id), httpOptions);
  }

  getLookFromLookStorageByIdOrDb(id: number): Promise<Look> {
    const promise = new Promise<Look>((resolve, reject) => { 

      let look ;

      let foundIndex = -1;
      foundIndex = (this.looksStorage) ? this.looksStorage.findIndex((l: Look) => l.id === id) : foundIndex;

      if(foundIndex > -1) {
        look = this.looksStorage[foundIndex];
        resolve(look);
      } else {
        this.getLookById(id)
        .toPromise()
        .then(
          response => {
            if(response) {
              resolve(response);
            }
          },
          error => reject(error)
        );
      }
    });

    return promise;
  }
}
