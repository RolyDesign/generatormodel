import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionModalHeaerService } from 'src/app/shared/action-modal-heaer.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent {
  @ViewChild('upload') upload!: ElementRef;
  constructor(
    private dataStorage: LocalStorageService,
    private router: Router,
  ) {}

  onOpenProject() {
    this.upload.nativeElement.click();
  }

  catchFile(e: any, file: string) {
    const myfile = e.target.files[0];
    if (myfile) {
      if (myfile.type && !myfile.type.includes('evaproj')) {
        return;
      }
      const reader = new FileReader();
      reader.readAsText(myfile);
      reader.onload = () => {
        this.dataStorage.addDataStorage(JSON.parse(reader.result as string));
        this.router.navigate(['/app/detail']);
      };
    }
  }
}
