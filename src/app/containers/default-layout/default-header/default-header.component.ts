import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { AppService } from 'src/app/shared/app.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { ActionModalHeaerService } from 'src/app/shared/action-modal-heaer.service';
const actionsModal = {
  new: 'new',
  open: 'open',
  close: 'close',
};

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  data = this.appService.getAll();
  icon = {
    edit: faEdit,
    download: faDownload,
  };
  @Input() sidebarId: string = 'sidebar';
  confirmMessage = `Esta accion eliminara los datos almacenados en el local storage.Asegurece de haber descargado el proyecto. Desea continuar.`;
  actionsModal!: string;
  actionsModalsConst = actionsModal;

  constructor(
    private appService: AppService,
    private dataStorage: LocalStorageService,
    private router: Router,
    private acctionModalService: ActionModalHeaerService
  ) {
    super();
  }

  onActions(action: string) {
    this.acctionModalService.action = action;
    if (action == actionsModal.new) {
      this.acctionModalService.messageModal = this.confirmMessage;
    }
    if (action == actionsModal.open) {
      this.acctionModalService.messageModal = this.confirmMessage;
    }
    if (action == actionsModal.close) {
      this.acctionModalService.messageModal = this.confirmMessage;
    }
  }

  onEditNameApp() {
    this.router.navigate(['/edit-app']);
  }

  // public newMessages = new Array(4)
  // public newTasks = new Array(5)
  // public newNotifications = new Array(5)

  // constructor(private classToggler: ClassToggleService) {
  //   super();
  // }
}
