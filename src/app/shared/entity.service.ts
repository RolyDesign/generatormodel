import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { IEntity, IFields, appModel } from './model-interfaces';
import { Observable, of, switchMap } from 'rxjs';
import { DataTypes } from '../generator-model/meta-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(
    private dataStorageSvc: LocalStorageService,
    private router: Router
  ) {}

  getAll(): Observable<IEntity[]> {
    return this.dataStorageSvc.getDataStorage().pipe(
      switchMap(res =>{
        return of(res.Entities.sort((a,b)=>a.Id - b.Id))
      })
    )
  }
  getById(id:number):Observable<IEntity>{
    return this.dataStorageSvc.getDataStorage().pipe(
      switchMap(res =>{
        return of(res.Entities.find(e => e.Id === id) as IEntity)
      })
    )
  }

  addEntity(dataForm: IEntity) {
    let currentdata = this.dataStorageSvc.getLocalStotage() as appModel;
    const newEntity: IEntity = {
      ...dataForm,
      Id: this.setEntityId(currentdata.Entities),
      AppId: currentdata.Id,
      Fields: [
        {
          Id: 1,
          EntityId: this.setEntityId(currentdata.Entities),
          Name: 'id',
          DisplayName: 'Id',
          Type: DataTypes.number,
        },
      ],
    };
    currentdata.Entities.push(newEntity);
    this.dataStorageSvc.addDataStorage(currentdata);
  }

  editEntity(dataForm: IEntity, entityId: number){
    let currentdata = this.dataStorageSvc.getLocalStotage() as appModel;
    const newEntity: IEntity = {
      ...dataForm,
      Id: entityId,
      AppId: currentdata.Id,
      Fields: currentdata.Entities.find(e => e.Id === entityId)?.Fields as IFields[],
    };
    const indexCurrentEntity = currentdata.Entities.findIndex(e => e.Id === entityId);
    currentdata.Entities[indexCurrentEntity] = newEntity
    this.dataStorageSvc.addDataStorage(currentdata);
  }

  deleteEntity(id:number){
    let data = <appModel>this.dataStorageSvc.getLocalStotage()
    const indexCurrentEntity = data.Entities.findIndex(e => e.Id === id);
    let newdata = data.Entities.splice(indexCurrentEntity,1)
    this.dataStorageSvc.addDataStorage(data)
  }

  private setEntityId(entities: IEntity[]): number {
    let id = 1;
    if (entities.length > 0) {
      entities.sort((a, b) => a.Id - b.Id);
      entities.reverse();
      id = entities[0].Id + 1;
    }
    return id;
  }
}
