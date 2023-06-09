import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { IEntity, appModel } from './model-interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private dataStorageSvc: LocalStorageService) {}

  getAll(): Observable<appModel> {
    return this.dataStorageSvc.getDataStorage();
  }
}
