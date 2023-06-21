import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntityService } from 'src/app/shared/entity.service';
import { VALIDATION_FORMS, helpeMessage } from 'src/app/shared/meta-data';
import { IEntity, IWeakEntity } from 'src/app/shared/model-interfaces';
import { WeakEntityService } from 'src/app/shared/weak-entity.service';

@Component({
  selector: 'app-add-weak-entity',
  templateUrl: './add-weak-entity.component.html',
  styleUrls: ['./add-weak-entity.component.scss']
})
export class AddWeakEntityComponent {
  helpMessage = helpeMessage;
  weakentity!: FormGroup;
  validationForms = VALIDATION_FORMS;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private weakEntityService: WeakEntityService
  ) {}

  ngOnInit(): void {
    this.weakentity = this.fb.group({
      Name: ['', [Validators.required]],
      PluralName: ['', [Validators.required]],
    });
  }

  createEntity() {
   this.weakEntityService.add(this.weakentity.value as IWeakEntity, 1)
   console.log("entro")
   this.router.navigate(['/app/detail']);
  }

  get fm() {
    return this.weakentity.controls;
  }

}
