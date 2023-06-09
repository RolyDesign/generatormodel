import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from './shared/local-storage.service';
import { FileStorageServiceService } from './shared/file-storage-service.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'CoreUI Free Angular Admin Template';


  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private dataStorage: LocalStorageService,
    private fileStorage: FileStorageServiceService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    const dataLocalStotage = this.dataStorage.getLocalStotage();
    if (!!dataLocalStotage) {
      this.dataStorage.addDataStorage(dataLocalStotage)
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/initial']);
    }
  }
}
