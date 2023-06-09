import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AppService } from '../../shared/app.service';
import { EntityService } from '../../shared/entity.service';
const actionsModal = {
  new: 'new',
  open: 'open',
  close: 'close',
};

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.scss'],
})
export class AppDetailComponent implements OnInit {
  data = this.appService.getAll();
  icon = {
    edit: faEdit,
    download: faDownload,
  };
  id!: number;
  entityName = '';
  confirmMessage = `Esta accion eliminara los datos almacenados en el local storage.Asegurece de haber descargado el proyecto. Desea continuar.`;
  actionsModal!: string;
  actionsModalsConst = actionsModal;

  constructor(
    private dataStorage: LocalStorageService,
    private router: Router,
    private appService: AppService,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {}

  onActions(action: string, id: number = 0, name = '') {
    this.id = id;
    this.entityName = name;
    this.actionsModal = action;
  }

  actions() {
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
    this.entityService.deleteEntity(this.id);
  }

  onEditNameApp() {
    this.router.navigate(['/edit-app']);
  }
}
