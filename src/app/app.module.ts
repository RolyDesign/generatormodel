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
import { GeneratorModelComponent } from './generator-model/generator-model.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GuideComponent } from './guide/guide.component';
import { ReadmodelsComponent } from './readmodels/readmodels.component';
import { ModelEditComponent } from './model-edit/model-edit.component';
import { InitialComponent } from './components/initial/initial.component';
import { AppDetailComponent } from './components/app-detail/app-detail.component';
import { NewProjectComponent } from './components/new-project/new-project.component';

import { CreateEntityComponent } from './components/create-entity/create-entity.component';
import{ConfirmComponent}from './shared/components/confirm/confirm.component';
import { EditEntityComponent } from './components/edit-entity/edit-entity.component';
import { AddFieldComponent } from './components/add-field/add-field.component';
import { ListFieldsComponent } from './components/list-fields/list-fields.component'
import{EditAppComponent} from './components/editapp/editapp.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component'



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, GeneratorModelComponent, GuideComponent, ReadmodelsComponent, ModelEditComponent, InitialComponent, AppDetailComponent, NewProjectComponent, EditAppComponent, CreateEntityComponent, EditEntityComponent, AddFieldComponent, ListFieldsComponent, EditFieldComponent],
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
    FormModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}