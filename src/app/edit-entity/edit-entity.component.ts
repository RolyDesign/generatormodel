import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  VALIDATION_FORMS,
  helpeMessage,
} from '../generator-model/message-validation.const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../shared/entity.service';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss'],
})
export class EditEntityComponent implements OnInit, OnDestroy {
  helpMessage = helpeMessage;
  entity!: FormGroup;
  validationForms = VALIDATION_FORMS;
  sub!: Subscription;
  id!: number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.entityService.getById(this.id).subscribe((res) => {
      this.entity = this.fb.group({
        Name: [res.Name, [Validators.required]],
        PluralName: [res.PluralName, [Validators.required]],
      });
    });
  }

  editEntity() {
    this.entityService.editEntity(this.entity.value, this.id);
    this.router.navigate(['/app-detail']);
  }

  get fm() {
    return this.entity.controls;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
