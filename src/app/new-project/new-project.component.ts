import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  VALIDATION_FORMS,
  helpeMessage,
} from '../generator-model/message-validation.const';
import { LocalStorageService } from '../shared/local-storage.service';
import { appModel } from '../shared/model-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataStorage: LocalStorageService, private router: Router) {}
  app!: FormGroup;
  helpMessage = helpeMessage;
  validationForms = VALIDATION_FORMS;
  data!:appModel

  ngOnInit(): void {
    this.app = this.fb.group({
      Name:['',[Validators.required]]
    })
  }
  createApp(){
    this.data = {
      Id:1,
      Name: this.app.get('Name')?.value,
      Entities:[]
    }
    //this.dataStorage.setLocalStotage(data)
    this.dataStorage.addDataStorage(this.data)
    this.router.navigate(["/app-detail"])
  }
  get fm() {
    return this.app.controls;
  }
}
