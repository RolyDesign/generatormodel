import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { appModel } from './model-interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
   private dataStorageSubject = new BehaviorSubject<appModel>({
    Id:1,
    Name: '',
    Entities: [],
  });
  constructor() {}

  getDataStorage() {
    return this.dataStorageSubject.asObservable()
  }

  addDataStorage(data: appModel){
   this.dataStorageSubject.next(data)
   this.setLocalStotage(data)
  }

  removeDataStorage(){
    window.localStorage.removeItem('eva-app')
    this.dataStorageSubject.next(
      { Id:1,
      Name: '',
      Entities: [],})
  }

  getLocalStotage(){
    const data = window.localStorage.getItem('eva-app');
    return data ? JSON.parse(data) : null
  }
  setLocalStotage(data: appModel){
    window.localStorage.setItem('eva-app',JSON.stringify(data))
  }
}
