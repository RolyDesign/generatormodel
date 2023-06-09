import { Component, OnInit } from '@angular/core';

//import { navItems } from './_nav';
import { INavData } from '@coreui/angular';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FileStorageServiceService } from 'src/app/shared/file-storage-service.service';
import { IEntity, IFields } from '../../shared/model-interfaces';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { ActionModalHeaerService } from 'src/app/shared/action-modal-heaer.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
const actionsModal = {
  new: 'new',
  open: 'open',
  close: 'close',
};
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

  constructor(
    private dataStorage: LocalStorageService,
    private actionMNodal: ActionModalHeaerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.actionMNodal.getmessageModal$.subscribe((res) => {
      this.messageModal = res;
    });
  }

  actions() {
    this.actionMNodal.getAction$.pipe(take(1)).subscribe((res) => {
      if (res == actionsModal.new) {
        this.router.navigateByUrl('/new-app');
        this.dataStorage.removeDataStorage();
      }
      if (res == actionsModal.open) {
        this.router.navigateByUrl('/new-app');
        this.dataStorage.removeDataStorage();
      }
      if (res == actionsModal.close) {
        this.router.navigateByUrl('/initial');
        this.dataStorage.removeDataStorage();
      }
    });
  }
}
