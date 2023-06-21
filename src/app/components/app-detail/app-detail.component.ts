import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AppService } from '../../shared/app.service';
import { EntityService } from '../../shared/entity.service';
import Ajv from 'ajv';
import { ENTITY_SCHEMA } from 'src/app/shared/schema';
import { appModel } from 'src/app/shared/model-interfaces';
import{MESSAGE} from '../../shared/message.modal'
import { ValidatorSchemaService } from 'src/app/shared/validatorschema.service';
import { Mode } from 'src/app/shared/meta-data';
import { ModePreferenceService } from 'src/app/shared/mode-preference.service';



@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.scss'],
})
export class AppDetailComponent implements OnInit {
  data = this.entityService.getAll();
  actionsConst = {
    delete: 'delete',
    export: 'export',
    exportFailed:'exportFailed',
    importFailed:'importFailed',
  }
  icon = {
    edit: faEdit,
    download: faDownload,
  };
  id!: number;
  entityName = '';
  confirmMessage = '';
  actionsModal!: string;
  mode$ = this.modeSvc.getMode()
  modes = Mode
  @ViewChild('upload') upload!: ElementRef;
  @ViewChild("openModal") openModal!: ElementRef
  constructor(
    private router: Router,
    private entityService: EntityService,
    private validatorAppSchema: ValidatorSchemaService,
    private modeSvc: ModePreferenceService
  ) {}

  ngOnInit(): void {
     //setea el estado de la data respecto al schema para habilitar o desabilitar el boton de ExportModal
    this.validatorAppSchema.validatorSchema = this.validatorAppSchema.validateAppSchema()
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
        this.actionsModal = 'exportFailed'
        this.confirmMessage = MESSAGE.SCHEMA_IMPORT_ICORRECT;
      }
    }
  }

  actions() {
    if (this.actionsModal == 'delete') {
      this.deleteEntity();
    }
    if (this.actionsModal == 'export') {
      this.exportEntity();
    }
  }

  deleteEntity() {
    this.entityService.deleteEntity(this.id);
     // setea el estado de la data respecto al schema para habilitar o desabilitar el boton de ExportModal
    this.validatorAppSchema.validatorSchema = this.validatorAppSchema.validateAppSchema()
  }

  exportEntity() {
    this.entityService.exportEntity(this.id);
  }

  importEntity() {
    this.upload.nativeElement.click();
  }

  onEditNameApp() {
    this.router.navigate(['/edit-app']);
  }

  catchFile(e: any, file: string) {
    const myfile = e.target.files[0];
    if(myfile){
      if (myfile.name && !myfile.name.includes('modelproj')) {
        this.actionsModal = 'importFailed'
           this.confirmMessage = MESSAGE.FORMAT_INCORRECT
           this.openModal.nativeElement.click()
           return
      }
      const reader = new FileReader();
      reader.readAsText(myfile);
      reader.onload = () => {
        var ajv = new Ajv();
        ajv.addKeyword('dependentRequired');
        const sch = ENTITY_SCHEMA;
        const validate = ajv.compile(sch);
        try {
           const valid = validate(JSON.parse(reader.result as string));
           if (!valid) {
             this.actionsModal = 'importFailed'
             this.confirmMessage = MESSAGE.SCHEMA_IMPORT_ICORRECT
             this.openModal.nativeElement.click()
           } else {
            this.entityService.addEntity(JSON.parse(reader.result as string))
            this.validatorAppSchema.validatorSchema = this.validatorAppSchema.validateAppSchema()
           }
        } catch {
          this.actionsModal = 'importFailed'
           this.confirmMessage = MESSAGE.ERROR_FILE
           this.openModal.nativeElement.click()
        }
      };
    }
     e.target.value = null
  }
}
