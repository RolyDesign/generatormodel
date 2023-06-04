import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IModel } from './model-interfaces';

@Injectable({
  providedIn: 'root',
})
export class FileStorageServiceService {
   private fileStorage = new BehaviorSubject<IModel>({Name:"",PluralName:"",Fields:[]});
  constructor() {}

  getFileStorage(): Observable<IModel> {
    return this.fileStorage.asObservable();
  }
  addFileStorage(file: IModel){
    this.fileStorage.next(file)
  }
}
