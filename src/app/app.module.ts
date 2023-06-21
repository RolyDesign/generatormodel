import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GuideComponent } from './guide/guide.component';
import { InitialComponent } from './components/initial/initial.component';
import { AppDetailComponent } from './components/app-detail/app-detail.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { CreateEntityComponent } from './components/create-entity/create-entity.component';
import { ConfirmComponent } from './shared/components/confirm/confirm.component';
import { EditEntityComponent } from './components/edit-entity/edit-entity.component';
import { AddFieldComponent } from './components/add-field/add-field.component';
import { ListFieldsComponent } from './components/list-fields/list-fields.component';
import { EditAppComponent } from './components/editapp/editapp.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { BuilderCommandComponent } from './components/builder-command/builder-command.component';
import { ListWeakEntitiesComponent } from './components/list-weak-entities/list-weak-entities.component';
import { AddWeakEntityComponent } from './components/add-weak-entity/add-weak-entity.component';
import { ListWeakEntityFieldsComponent } from './components/list-weak-entity-fields/list-weak-entity-fields.component';
import { EditWeakEntityComponent } from './components/edit-weak-entity/edit-weak-entity.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    InitialComponent,
    AppDetailComponent,
    NewProjectComponent,
    EditAppComponent,
    CreateEntityComponent,
    EditEntityComponent,
    AddFieldComponent,
    ListFieldsComponent,
    EditFieldComponent,
    BuilderCommandComponent,
    ListWeakEntitiesComponent,
    AddWeakEntityComponent,
    ListWeakEntityFieldsComponent,
    EditWeakEntityComponent,

  ],
  imports: [
    ConfirmComponent,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    HttpClientModule,
    FontAwesomeModule,
    FormModule,
  ],
  providers: [
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    // },
    IconSetService,
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
