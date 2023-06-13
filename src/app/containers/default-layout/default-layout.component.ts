import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

//import { navItems } from './_nav';
import { INavData } from '@coreui/angular';
import { appModel } from '../../shared/model-interfaces';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { ActionModalHeaerService } from 'src/app/shared/action-modal-heaer.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { saveAs } from 'file-saver';
import { APP_SCHEMA } from 'src/app/shared/schema';
import Ajv from 'ajv';
import { actionsModal } from '../action-modal.const';
import { MESSAGE } from 'src/app/shared/message.modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public navItems: INavData[] = [];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  messageModal!: string;
  messageError = '';
  action$ = this.actionMNodal.getAction$;
  actionsModals = actionsModal;

  constructor(
    private dataStorage: LocalStorageService,
    private actionMNodal: ActionModalHeaerService,
    private router: Router
  ) {}

  @ViewChild('upload') upload!: ElementRef;
  @ViewChild('openModal') openModal!: ElementRef;

  ngOnInit(): void {
    this.actionMNodal.getmessageModal$.subscribe((res) => {
      this.messageModal = res;
    });
  }
  catchFile(e: any, file: string) {
    const myfile = e.target.files[0];
    if (myfile) {
      if (myfile.type && !myfile.type.includes('evaproj')) {
        this.actionMNodal.action = actionsModal.importFailed;
        this.actionMNodal.messageModal = MESSAGE.FORMAT_INCORRECT;
        this.openModal.nativeElement.click();
        return;
      }
      const reader = new FileReader();
      reader.readAsText(myfile);
      reader.onload = () => {
        var ajv = new Ajv();
        ajv.addKeyword('dependentRequired');
        const sch = APP_SCHEMA;
        const validate = ajv.compile(sch);
        try {
          const valid = validate(JSON.parse(reader.result as string));
          if (!valid) {
            this.actionMNodal.action = actionsModal.importFailed;
            this.actionMNodal.messageModal = MESSAGE.SCHEMA_IMPORT_ICORRECT;
            this.openModal.nativeElement.click();
          } else {
            this.dataStorage.addDataStorage(
              JSON.parse(reader.result as string)
            );
            this.router.navigate(['/app/detail']);
          }
        } catch {
          this.actionMNodal.action = actionsModal.importFailed;
          this.actionMNodal.messageModal = MESSAGE.ERROR_FILE;
          this.openModal.nativeElement.click();
        }
      };
    }
    e.target.value = null;
  }

  actions() {
    this.actionMNodal.getAction$.pipe(take(1)).subscribe((res) => {
      if (res == actionsModal.new) {
        this.router.navigateByUrl('/new-app');
        this.dataStorage.removeDataStorage();
      }
      if (res == actionsModal.open) {
        this.upload.nativeElement.click();
      }
      if (res == actionsModal.close) {
        this.router.navigateByUrl('/initial');
        this.dataStorage.removeDataStorage();
      }
      if (res == actionsModal.export) {
        const data = this.dataStorage.getLocalStotage() as appModel;
        const file = new File([JSON.stringify(data)], data.Name + '.evaproj', {
          type: 'text/plain;charset=utf-8',
        });
        saveAs(file);
      }
    });
  }
}
