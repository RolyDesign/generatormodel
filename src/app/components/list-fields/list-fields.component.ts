import { Component, OnDestroy } from '@angular/core';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { IFields } from 'src/app/shared/model-interfaces';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { AppService } from 'src/app/shared/app.service';
import { FieldService } from 'src/app/shared/field.service';
import { EntityService } from 'src/app/shared/entity.service';

const actionsModal = {
  new: 'new',
  open: 'open',
  close: 'close',
};
@Component({
  selector: 'app-list-fields',
  templateUrl: './list-fields.component.html',
  styleUrls: ['./list-fields.component.scss'],
})
export class ListFieldsComponent {
  fields!: Observable<IFields[]>;
  icon = {
    edit: faEdit,
    download: faDownload,
  };
  entityId!: number;
  entityName = '';
  confirmMessage = `Esta accion eliminara los datos almacenados en el local storage.Asegurece de haber descargado el proyecto. Desea continuar.`;
  actionsModal!: string;
  actionsModalsConst = actionsModal;
  fieldId!: number;
  fieldName!: string;

  constructor(
    private route: ActivatedRoute,
    private fieldService: FieldService,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {
    this.entityId = Number(this.route.snapshot.paramMap.get('id'));
    this.entityService
      .getById(this.entityId)
      .pipe(take(1))
      .subscribe((res) => {
        this.entityName = res.Name;
      });
    this.fields = this.fieldService.getAll(this.entityId);
  }

  saveIdAndName(fieldId: number, name: string) {
    this.fieldId = fieldId;
    this.fieldName = name;
  }

  deletefield() {
    this.fieldService.deleteField(this.entityId, this.fieldId);
  }
}
