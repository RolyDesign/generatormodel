import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {IEntity, IFields, appModel}from "./model-interfaces"
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(private dataStorageSvc: LocalStorageService, private router: Router) { }

  add(formdData: IFields,  entityId: number){
    let currentData =  this.dataStorageSvc.getLocalStotage() as appModel
   const entities = currentData.Entities;
   const currentEntity = <IEntity>entities.find(e => e.Id === entityId)
   const newField:IFields = {
    ...formdData,
    Id: this.setFieldId(currentEntity.Fields),
    EntityId: currentEntity.Id,

   }
    currentData.Entities.find(e => e.Id === entityId)?.Fields.push(newField);
    this.dataStorageSvc.addDataStorage(currentData);

  }
  getAll(entityId: number):Observable<IFields[]>{
    return this.dataStorageSvc.getDataStorage().pipe(
      switchMap(res=>{
        return of(res.Entities.find(e=> e.Id == entityId)?.Fields as IFields[])
      })
    )
  }

  getbById(entityId: number, fieldId: number):Observable<IFields>{
    return this.getAll(entityId).pipe(
      switchMap(res=>{
        return of(res.find(f => f.Id === fieldId) as IFields)
      })
    )

  }

  private setFieldId(fields: IFields[]): number {
    let id = 1;
    if (fields.length > 0) {
      fields.sort((a, b) => a.Id - b.Id);
      fields.reverse();
      id = fields[0].Id + 1;
    }
    return id;
  }

}
