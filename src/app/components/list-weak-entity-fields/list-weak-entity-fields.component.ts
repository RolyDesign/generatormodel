import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Observable, take } from 'rxjs';
import { EntityService } from 'src/app/shared/entity.service';
import { FieldService } from 'src/app/shared/field.service';
import { Mode } from 'src/app/shared/meta-data';
import { ModePreferenceService } from 'src/app/shared/mode-preference.service';
import { IFields } from 'src/app/shared/model-interfaces';
import { WeakEntityService } from 'src/app/shared/weak-entity.service';

@Component({
  selector: 'app-list-weak-entity-fields',
  templateUrl: './list-weak-entity-fields.component.html',
  styleUrls: ['./list-weak-entity-fields.component.scss']
})
export class ListWeakEntityFieldsComponent {
  fields!: Observable<IFields[]>;
  icon = {
    edit: faEdit,
    download: faDownload,
  };
  entityId!: number;
  entityName = '';
  confirmMessage = `Esta accion eliminara los datos almacenados en el local storage.Asegurece de haber descargado el proyecto. Desea continuar.`;
  actionsModal!: string;
  actionsModalsConst = this.actionsModal;
  fieldId!: number;
  fieldName!: string;
  mode$ = this.modeSvc.getMode()
  modes = Mode
  weakEntityName = ''
  weakEntityId! :number

  constructor(
    private route: ActivatedRoute,
    private fieldService: FieldService,
    private entityService: EntityService,
    private weakEntitySvc: WeakEntityService,
    private modeSvc: ModePreferenceService
  ) {}

  ngOnInit(): void {
    this.entityId = Number(this.route.snapshot.paramMap.get('entityid'));
    this.weakEntityId = Number(this.route.snapshot.paramMap.get('weakEntitiesId'));
    this.entityService
      .getById(this.entityId)
      .pipe(take(1))
      .subscribe((res) => {
        this.entityName = res.Name;
      });
      this.weakEntitySvc.getbById(this.entityId,this.weakEntityId).subscribe(res=>{
        this.weakEntityName = res.Name
      })

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
