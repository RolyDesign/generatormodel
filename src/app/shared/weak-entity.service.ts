import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { IEntity, IWeakEntity, appModel } from './model-interfaces';
import { Observable, of, switchMap } from 'rxjs';
import { DataTypes } from './meta-data';

@Injectable({
  providedIn: 'root'
})
export class WeakEntityService {

  constructor(
    private dataStorageSvc: LocalStorageService,
    private router: Router
  ) {}

  add(formdData: IWeakEntity, entityId: number) {
    let currentData = this.dataStorageSvc.getLocalStotage() as appModel;
    const entities = currentData.Entities;
    const currentEntity = <IEntity>entities.find((e) => e.Id === entityId);
    const newWeakEntity: IWeakEntity = {
      ...formdData,
      Id: this.setWeakEntityId(currentEntity.WeakEntities ?? []),
      EntityId: currentEntity.Id,
      WeakEntityFields: [
        {
          Id: 1,
          WeakEntityId: this.setWeakEntityId(currentEntity.WeakEntities ?? []),
          Name: 'id',
          DisplayName: 'Id',
          Type: DataTypes.number,
        },
      ],
    };
    let weakEntities = currentData.Entities.find((e) => e.Id === entityId)?.WeakEntities ?? []
    weakEntities.push(newWeakEntity)
    this.dataStorageSvc.addDataStorage(currentData);
    console.log(newWeakEntity)
  }
  getAll(entityId: number): Observable<IWeakEntity[]> {
    return this.dataStorageSvc.getDataStorage().pipe(
      switchMap((res) => {
        return of(
          res.Entities.find((e) => e.Id == entityId)?.WeakEntities?.sort(
            (a, b) => a.Id - b.Id
          ) as IWeakEntity[]
        );
      })
    );
  }

  getbById(entityId: number, weakEntityId: number): Observable<IWeakEntity> {
    return this.getAll(entityId).pipe(
      switchMap((res) => {
        return of(res.find((w) => w.Id === weakEntityId) as IWeakEntity);
      })
    );
  }

  // editField(dataForm: IFields, entityId: number, fieldId: number) {
  //   let currentdata = this.dataStorageSvc.getLocalStotage() as appModel;
  //   const newfield: IFields = {
  //     ...dataForm,
  //     Id: fieldId,
  //     EntityId: entityId,
  //   };
  //   const indexCurrentEntity = currentdata.Entities.findIndex(e => e.Id === entityId);
  //   const indexFieldToUpdate = currentdata.Entities[indexCurrentEntity].Fields.findIndex(f => f.Id === fieldId);
  //   currentdata.Entities[indexCurrentEntity].Fields[indexFieldToUpdate] = newfield;
  //   this.dataStorageSvc.addDataStorage(currentdata);
  // }

  delete(entityId:number, weakEntityId:number){
    let data = <appModel>this.dataStorageSvc.getLocalStotage()
    const indexCurrentEntity = data.Entities.findIndex(e => e.Id === entityId);
    const indexweakEntityToDelete = data.Entities[indexCurrentEntity].WeakEntities.findIndex(we => we.Id === weakEntityId);
    data.Entities[indexCurrentEntity].WeakEntities.splice(indexweakEntityToDelete,1)
    this.dataStorageSvc.addDataStorage(data)
  }

  private setWeakEntityId(weakEntities: IWeakEntity[]): number {
    let id = 1;
    if (weakEntities.length > 0) {
      weakEntities.sort((a, b) => a.Id - b.Id);
      weakEntities.reverse();
      id = weakEntities[0].Id + 1;
    }
    return id;
  }
}
