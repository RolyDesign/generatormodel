import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../../shared/entity.service';
import { VALIDATION_FORMS, helpeMessage } from 'src/app/shared/meta-data';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss'],
})
export class EditEntityComponent implements OnInit{
  helpMessage = helpeMessage;
  entity!: FormGroup;
  validationForms = VALIDATION_FORMS;

  id!: number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.entityService.getById(this.id).pipe(take(1)).subscribe((res) => {
      this.entity = this.fb.group({
        Name: [res.Name, [Validators.required]],
        PluralName: [res.PluralName, [Validators.required]],
      });
    });
  }

  editEntity() {
    this.entityService.editEntity(this.entity.value, this.id);
    this.router.navigate(['/app/detail']);
  }

  get fm() {
    return this.entity.controls;
  }


}
