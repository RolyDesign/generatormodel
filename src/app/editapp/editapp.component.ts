import { Component, OnDestroy, OnInit } from '@angular/core';
import { appModel } from '../shared/model-interfaces';
import { LocalStorageService } from '../shared/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  VALIDATION_FORMS,
  helpeMessage,
} from '../generator-model/message-validation.const';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editapp',
  templateUrl: './editapp.component.html',
  styleUrls: ['./editapp.component.scss'],
})
export class EditAppComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private dataStorageSvc: LocalStorageService,
    private router: Router
  ) {}

  app!: FormGroup;
  helpMessage = helpeMessage;
  validationForms = VALIDATION_FORMS;
  sub!: Subscription
  data!:appModel

  ngOnInit(): void {
    this.app = this.fb.group({
      Name: ['', [Validators.required]],
    });

    this.sub = this.dataStorageSvc.getDataStorage().subscribe(res=>{
      this.app.get('Name')?.setValue(res.Name)
      this.data = {
        Id: res.Id,
        Name: res.Name,
        Entities: res.Entities
      }
    })
  }

  editApp() {
   this.data.Name = this.app.get("Name")?.value
    this.dataStorageSvc.addDataStorage(this.data)
   // this.dataStorageSvc.setLocalStotage(data)
    this.router.navigate(["/app-detail"])
  }

  get fm() {
    return this.app.controls;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
