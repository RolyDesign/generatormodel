import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { IEntity, IFields, appModel } from './model-interfaces';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  constructor(
    private dataStorageSvc: LocalStorageService,
    private router: Router
  ) {}

  add(formdData: IFields, entityId: number) {
    let currentData = this.dataStorageSvc.getLocalStotage() as appModel;
    const entities = currentData.Entities;
    const currentEntity = <IEntity>entities.find((e) => e.Id === entityId);
    const newField: IFields = {
      ...formdData,
      Id: this.setFieldId(currentEntity.Fields),
      EntityId: currentEntity.Id,
    };
    currentData.Entities.find((e) => e.Id === entityId)?.Fields.push(newField);
    this.dataStorageSvc.addDataStorage(currentData);
  }
  getAll(entityId: number): Observable<IFields[]> {
    return this.dataStorageSvc.getDataStorage().pipe(
      switchMap((res) => {
        return of(
          res.Entities.find((e) => e.Id == entityId)?.Fields.sort(
            (a, b) => a.Id - b.Id
          ) as IFields[]
        );
      })
    );
  }

  getbById(entityId: number, fieldId: number): Observable<IFields> {
    return this.getAll(entityId).pipe(
      switchMap((res) => {
        return of(res.find((f) => f.Id === fieldId) as IFields);
      })
    );
  }

  editField(dataForm: IFields, entityId: number, fieldId: number) {
    let currentdata = this.dataStorageSvc.getLocalStotage() as appModel;
    const newfield: IFields = {
      ...dataForm,
      Id: fieldId,
      EntityId: entityId,
    };
    const indexCurrentEntity = currentdata.Entities.findIndex(e => e.Id === entityId);
    const indexFieldToUpdate = currentdata.Entities[indexCurrentEntity].Fields.findIndex(f => f.Id === fieldId);
    currentdata.Entities[indexCurrentEntity].Fields[indexFieldToUpdate] = newfield;
    this.dataStorageSvc.addDataStorage(currentdata);
  }

  deleteField(entityid:number, fieldId:number){
    let data = <appModel>this.dataStorageSvc.getLocalStotage()
    const indexCurrentEntity = data.Entities.findIndex(e => e.Id === entityid);
    const indexFieldToDelete = data.Entities[indexCurrentEntity].Fields.findIndex(f => f.Id === fieldId);
    data.Entities[indexCurrentEntity].Fields.splice(indexFieldToDelete,1)
    this.dataStorageSvc.addDataStorage(data)
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
