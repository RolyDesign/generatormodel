import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { InitialComponent } from './components/initial/initial.component';
import { AppDetailComponent } from './components/app-detail/app-detail.component';
import { EditAppComponent } from './components/editapp/editapp.component';
import { CreateEntityComponent } from './components/create-entity/create-entity.component';
import { EditEntityComponent } from './components/edit-entity/edit-entity.component';
import { AddFieldComponent } from './components/add-field/add-field.component';
import { ListFieldsComponent } from './components/list-fields/list-fields.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { BuilderCommandComponent } from './components/builder-command/builder-command.component';
import { ListWeakEntitiesComponent } from './components/list-weak-entities/list-weak-entities.component';
import { AddWeakEntityComponent } from './components/add-weak-entity/add-weak-entity.component';
import { ListWeakEntityFieldsComponent } from './components/list-weak-entity-fields/list-weak-entity-fields.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/detail',
    pathMatch: 'full'
  },
  {
    path: 'initial',
    component: InitialComponent,
    title:'Welcome'
  },
  {
    path: 'new-app',
    component: NewProjectComponent,
    title:'Create New App'
  },
  {
    path: 'app/edit',
    component: EditAppComponent,
    title:'Edit App'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'app/detail',
        component: AppDetailComponent,
        title:'App Detail'
      },
      {
        path: 'entities/add',
        component: CreateEntityComponent,
        title:'Add Entity'
      },
      {
        path: 'entities/:id/edit',
        component: EditEntityComponent,
        title:'Edit Entity'
      },
      {
        path: 'entities/:id/fields/add',
        component: AddFieldComponent,
        title:'Add Field'
      },
      {
        path: 'entities/:id/fields',
        component: ListFieldsComponent,
        title:'Entity Fields'
      },
      {
        path: 'entities/:id/weak-entities',
        component: ListWeakEntitiesComponent,
        title:'Weak Entities'
      },
      {
        path: 'entities/:id/weak-entities/add',
        component: AddWeakEntityComponent,
        title:'Add Weak Entities'
      },
      {
        path: 'entities/:entityid/weak-entities/:weakEntitiesId/fields',
        component: ListWeakEntityFieldsComponent,
        title:'Fields Weak Entities'
      },
      {
        path: 'entities/:entityid/fields/:fieldid',
        component: EditFieldComponent,
        title:'Edit Fields'
      },
      {
        path: 'builder-command',
        component: BuilderCommandComponent,
        title:'Builder Command'
      },
      {
        path: 'guide',
        loadChildren: () =>
          import('./components/prueva/prueva.module').then((m) => m.PruevaModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  // {
  //   path: '500',
  //   component: Page500Component,
  //   data: {
  //     title: 'Page 500'
  //   }
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: {
  //     title: 'Login Page'
  //   }
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   data: {
  //     title: 'Register Page'
  //   }
  // },
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //scrollPositionRestoration: 'top',
      //anchorScrolling: 'enabled',
      //initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
