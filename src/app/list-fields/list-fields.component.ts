import { Component } from '@angular/core';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../shared/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../shared/app.service';
import { EntityService } from '../shared/entity.service';
import { FieldService } from '../shared/field.service';
import { Observable } from 'rxjs';
import { IFields } from '../shared/model-interfaces';
const actionsModal = {
  new: 'new',
  open: 'open',
  close: 'close',
};
@Component({
  selector: 'app-list-fields',
  templateUrl: './list-fields.component.html',
  styleUrls: ['./list-fields.component.scss']
})
export class ListFieldsComponent {
  data = this.appService.getAll();
  fields!: Observable<IFields[]>
  icon = {
    edit: faEdit,
    download: faDownload,
  };
  entityId!: number;
  entityName = '';
  confirmMessage = `Esta accion eliminara los datos almacenados en el local storage.Asegurece de haber descargado el proyecto. Desea continuar.`;
  actionsModal!: string;
  actionsModalsConst = actionsModal;

  constructor(
    private dataStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private fieldService: FieldService,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {
    this.entityId = Number(this.route.snapshot.paramMap.get('id'))
    this.fields = this.fieldService.getAll(this.entityId)
  }

  onActions(action: string, id: number = 0, name = '') {
    // this.id = id;
    // this.entityName = name;
    // this.actionsModal = action;
  }

  actions() {
    this.dataStorage.addDataStorage({
      Id: 0,
      Name: '',
      Entities: [],
    });
    this.dataStorage.removeDataStorage();
    if (this.actionsModal == actionsModal.new) {
      this.router.navigate(['/new-app']);
    }
    if (this.actionsModal == actionsModal.open) {
      this.router.navigate(['/new-app']);
    }
    if (this.actionsModal == actionsModal.close) {
      this.router.navigate(['/initial']);
    }
  }

  deleteEntity() {
    // this.entityService.deleteEntity(this.id);
  }

  onEditNameApp() {
    this.router.navigate(['/edit-app']);
  }
}
