import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { IEntity, appModel } from './model-interfaces';
import Ajv from 'ajv';
import { APP_SCHEMA, ENTITY_SCHEMA } from './schema';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorSchemaService {

  constructor(private dataStorageSvc: LocalStorageService) { }

  private validatorSchemaSubject =new BehaviorSubject<boolean>(false)

  getValidatorSchema = this.validatorSchemaSubject.asObservable();
  set validatorSchema(value: boolean){
    this.validatorSchemaSubject.next(value)
  }

  validateAppSchema(): boolean {
    let data = <appModel>this.dataStorageSvc.getLocalStotage();
      var ajv = new Ajv();
      ajv.addKeyword('dependentRequired');
      const sch = APP_SCHEMA;
      const validate = ajv.compile(sch);
      try {
        const valid = validate(data);
        if (!valid) {
          return false
        }
          return  true
      } catch {
        return  false
      }
  }
}
