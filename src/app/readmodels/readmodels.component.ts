import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { IModel } from '../shared/model-interfaces';
import Ajv from 'ajv';
import {schema} from '../shared/schema';
import {FileStorageServiceService}from '../shared/file-storage-service.service'

@Component({
  selector: 'app-readmodels',
  templateUrl: './readmodels.component.html',
  styleUrls: ['./readmodels.component.scss'],
})
export class ReadmodelsComponent implements OnInit {
  constructor(private fb: FormBuilder, private fileStotrageSvc: FileStorageServiceService) {}
  readFile!: FormGroup;
  protected currentFilesSubject = new Subject<IModel>();
  messageError = ""

  ngOnInit(): void {
    this.readFile = this.fb.group({
      currentfile: null,
    });
  }

  catchFile(e: any, file: string) {
    const myfile = e.target.files[0];
    if (myfile.type && !myfile.type.includes('application/json')) {
      return;
    }
    const reader = new FileReader();
    reader.readAsText(myfile);
    reader.onload = () => {
        var ajv = new Ajv();
        ajv.addKeyword("dependentRequired")
        const sch = schema
        const validate = ajv.compile(sch);
        try{
          const valid = validate(JSON.parse(reader.result as string));
          if (!valid){
            this.messageError = "El modelo no cumple con el schema"
          }else{
            this.messageError = ""
            this.currentFilesSubject.next(JSON.parse(reader.result as string))
            this.fileStotrageSvc.addFileStorage(JSON.parse(reader.result as string))
          }
        }catch{
          this.messageError = "Error en el modelo seleccionado"
        }


        //this.currentFilesSubject.next(JSON.parse(reader.result as string));
    };

  }
  onRemoveFile(file: File) {}
}
