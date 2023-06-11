import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Ajv from 'ajv';
import { ActionModalHeaerService } from 'src/app/shared/action-modal-heaer.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { schema } from 'src/app/shared/schema';

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
        return;
      }
      const reader = new FileReader();
      reader.readAsText(myfile);
      reader.onload = () => {
        var ajv = new Ajv();
        ajv.addKeyword('dependentRequired');
        const sch = schema;
        const validate = ajv.compile(sch);
        try {
          const valid = validate(JSON.parse(reader.result as string));
          if (!valid) {
            console.error("El modelo no cumple con el schema ", validate.errors)
            this.messageError = `El modelo no cumple con el schema`;
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
          this.messageError = 'Error en el modelo seleccionado';
          this.showModal = true
        }
      };
    }
    e.target.value = null
  }
}
