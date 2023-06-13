// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, Subject } from 'rxjs';
// import { IEntity, appModel } from './model-interfaces';
// import { DataTypes } from '../generator-model/meta-data';

// @Injectable({
//   providedIn: 'root',
// })
// export class FileStorageServiceService {
//    private fileStorage = new BehaviorSubject<IEntity>({Id:0,AppId:1, Name:"",PluralName:"",Fields:[]});
//   //  private appModelSubject = new BehaviorSubject<appModel>({
//   //   Id:0,
//   //   Name:"",
//   //   Entities:[]
//   // })
//   constructor() {}

//   getFileStorage(): Observable<IEntity> {
//     return this.fileStorage.asObservable();
//   }
//   addFileStorage(file: IEntity){
//     this.fileStorage.next(file)
//   }
// }
