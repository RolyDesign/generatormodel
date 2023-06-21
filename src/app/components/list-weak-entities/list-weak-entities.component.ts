import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Observable, take } from 'rxjs';
import { EntityService } from 'src/app/shared/entity.service';
import { WeakEntityService } from 'src/app/shared/weak-entity.service';
import { Mode } from 'src/app/shared/meta-data';
import { ModePreferenceService } from 'src/app/shared/mode-preference.service';
import { IFields, IWeakEntity } from 'src/app/shared/model-interfaces';
import { MESSAGE } from 'src/app/shared/message.modal';

@Component({
  selector: 'app-list-weak-entities',
  templateUrl: './list-weak-entities.component.html',
  styleUrls: ['./list-weak-entities.component.scss'],
})
export class ListWeakEntitiesComponent {
  weakEntities!: Observable<IWeakEntity[]>;
  icon = {
    edit: faEdit,
    download: faDownload,
  };
  id!: number;
  entityId!: number;
  entityName = '';
  confirmMessage = `Esta accion eliminara los datos almacenados en el local storage.Asegurece de haber descargado el proyecto. Desea continuar.`;
  actionsModal!: string;
  actionsModalsConst = this.actionsModal;
  fieldId!: number;
  fieldName!: string;
  mode$ = this.modeSvc.getMode();
  modes = Mode;
  validatorAppSchema: any;
  actionsConst = {
    delete: 'delete',
  };

  constructor(
    private route: ActivatedRoute,
    private weakEntitiesSvc: WeakEntityService,
    private entityService: EntityService,
    private modeSvc: ModePreferenceService,
  ) {}

  ngOnInit(): void {
    this.entityId = Number(this.route.snapshot.paramMap.get('id'));
    this.entityService
      .getById(this.entityId)
      .pipe(take(1))
      .subscribe((res) => {
        this.entityName = res.Name;
      });
    this.weakEntities = this.weakEntitiesSvc.getAll(this.entityId);
  }

  onActions(action: string, id: number = 0, name = '') {
    this.id = id;
    this.entityName = name;
    this.actionsModal = action;
    if (action == 'delete') {
      this.confirmMessage = MESSAGE.DELETE_ENTITY + name;
    }
    if (action == 'export') {
      const validationEntitySchema = this.entityService.validateEntitySchema(
        this.id
      );
      if (validationEntitySchema) {
        this.confirmMessage = MESSAGE.EXPORT_ENTITY_SUCCESS + name;
      } else {
        this.actionsModal = 'exportFailed';
        this.confirmMessage = MESSAGE.SCHEMA_IMPORT_ICORRECT;
      }
    }
  }

  actions() {
    if (this.actionsModal == 'delete') {
      this.deleteEntity();
    }
  }

  deleteEntity() {
    this.weakEntitiesSvc.delete(this.entityId, this.id);
  }
}
