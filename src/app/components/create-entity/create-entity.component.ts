import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/local-storage.service';
import { Subscription } from 'rxjs';
import { IEntity, appModel } from '../../shared/model-interfaces';
import {EntityService} from '../../shared/entity.service'
import { VALIDATION_FORMS, helpeMessage } from 'src/app/shared/meta-data';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss'],
})
export class CreateEntityComponent implements OnInit{
  helpMessage = helpeMessage;
  entity!: FormGroup;
  validationForms = VALIDATION_FORMS;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {
    this.entity = this.fb.group({
      Name: ['', [Validators.required]],
      PluralName: ['', [Validators.required]],
    });
  }

  createEntity() {
   this.entityService.addEntity(this.entity.value as IEntity)
   this.router.navigate(['/app/detail']);
  }

  get fm() {
    return this.entity.controls;
  }

}
