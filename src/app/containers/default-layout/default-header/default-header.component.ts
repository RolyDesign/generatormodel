import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { AppService } from 'src/app/shared/app.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { ActionModalHeaerService } from 'src/app/shared/action-modal-heaer.service';
import Ajv from 'ajv';
import { APP_SCHEMA } from 'src/app/shared/schema';
import { appModel } from 'src/app/shared/model-interfaces';
import {actionsModal} from '../../action-modal.const'
import { MESSAGE } from 'src/app/shared/message.modal';
import{ValidatorSchemaService} from '../../../shared/validatorschema.service'

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls:['./default-header.component.scss'],
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  data = this.appService.getAll();
  icon = {
    edit: faEdit,
    download: faDownload,
  };
  @Input() sidebarId: string = 'sidebar';
  confirmMessage = MESSAGE.CLEAN_LOCALSTORAGE;
  actionsModal!: string;
  actionsModalsConst = actionsModal;
  checkExport$ = this.validatorAppSchema.getValidatorSchema


  constructor(
    private appService: AppService,
    private dataStorage: LocalStorageService,
    private router: Router,
    private acctionModalService: ActionModalHeaerService,
    private validatorAppSchema: ValidatorSchemaService
  ) {
    super();
  }
  ngOnInit(): void {

  }

  onActions(action: string) {
    this.acctionModalService.action = action;
    this.acctionModalService.idModal = action
    if (action == actionsModal.new) {
      this.acctionModalService.messageModal = this.confirmMessage;
    }
    if (action == actionsModal.open) {
      this.acctionModalService.messageModal = this.confirmMessage;

    }
    if (action == actionsModal.close) {
      this.acctionModalService.messageModal = this.confirmMessage;
    }
    if (action == actionsModal.export) {
      const data = this.dataStorage.getLocalStotage() as appModel
      let ajv = new Ajv();
      ajv.addKeyword('dependentRequired');
      const sch = APP_SCHEMA;
      const validate = ajv.compile(sch);
      try {
        const valid = validate(data);
        if (!valid) {
          this.acctionModalService.messageModal = MESSAGE.SCHEMA_EXPORT_ICORRECT
          this.acctionModalService.action = actionsModal.exportFailed
        } else {
          this.acctionModalService.messageModal = MESSAGE.EXPORT_APP_SUCCESS + data.Name
        }
      } catch (e) {
        this.acctionModalService.messageModal = MESSAGE.ERROR_FILE
        this.acctionModalService.action = actionsModal.exportFailed
      }
    }
  }

  onEditNameApp() {
    this.router.navigate(['/edit-app']);
  }

}
