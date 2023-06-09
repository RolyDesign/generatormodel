import { Component, OnInit } from '@angular/core';

//import { navItems } from './_nav';
import { INavData } from '@coreui/angular';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FileStorageServiceService } from 'src/app/shared/file-storage-service.service';
import { IEntity, IFields } from '../../shared/model-interfaces';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public navItems: INavData[] = [];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private fileStorge: FileStorageServiceService, private dataStorage: LocalStorageService) {}
  ngOnInit(): void {
    // this.dataStorage.getDataStorage().subscribe((res) => {
    //   this.navItems.push({
    //     name: res.Name,
    //     url: '/',
    //     class:"indexer-app-nav",
    //     children: [...this.entities(res.Entities)],
    //   });
    // });
  }
  entities(ent: IEntity[]) {
    let entityList: INavData[] = [];
    ent.forEach((el) => {
      entityList.push({
        name: el.Name,
        url: `/entities/${el.Name.toLocaleLowerCase()}`,
        class:"indexer-ent-nav",
        children:[...this.fields(el.Fields)]
      });
    });
    return entityList
  }

  fields(fields: IFields[]) {
    let fieldsList: INavData[] = [];
    fields.forEach((el) => {
      fieldsList.push({
        name: el.Name,
        url: `/entities/${el.Name.toLocaleLowerCase()}/fields/${el.Name}`,
        class:"indexer-field-nav",
      });
    });
    return fieldsList
  }
}


