import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Ajv from 'ajv';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { MESSAGE } from 'src/app/shared/message.modal';
import { APP_SCHEMA } from 'src/app/shared/schema';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent {
  @ViewChild('upload') upload!: ElementRef;
  messageError = '';
  showModal = false
  constructor(
    private dataStorage: LocalStorageService,
    private router: Router
  ) {}

  onOpenProject() {
    this.upload.nativeElement.click();
  }

  catchFile(e: any) {
    const myfile = e.target.files[0];
    if (myfile) {
      if (myfile.type && !myfile.type.includes('evaproj')) {
        this.messageError = MESSAGE.FORMAT_INCORRECT
        this.showModal = true
        return
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
            this.messageError = MESSAGE.SCHEMA_IMPORT_ICORRECT
            this.showModal = true
          } else {
            this.showModal = false
            this.messageError = '';
            this.dataStorage.addDataStorage(
              JSON.parse(reader.result as string)
            );
            this.router.navigate(['/app/detail']);
          }
        } catch {
          this.messageError = MESSAGE.ERROR_FILE
          this.showModal = true
        }
      };
    }
    e.target.value = null
  }
}
