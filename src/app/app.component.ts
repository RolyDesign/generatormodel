import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './shared/local-storage.service';
import { ModePreferenceService } from './shared/mode-preference.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',

})
export class AppComponent {
  title = 'builder-model';
  constructor(
    private router: Router,
    private dataStorage: LocalStorageService,
    private modeSvc: ModePreferenceService
  ) {}

  ngOnInit(): void {
    const mode = window.localStorage.getItem('eva-app-mode');
    console.log(mode);
    if (mode) {
      this.modeSvc.setMode = mode;
    }
    const dataLocalStotage = this.dataStorage.getLocalStotage();
    if (dataLocalStotage) {
      this.dataStorage.addDataStorage(dataLocalStotage);
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/initial']);
    }
  }
}
