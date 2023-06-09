import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { GeneratorModelComponent } from './generator-model/generator-model.component';
import { GuideComponent } from './guide/guide.component';
import { ReadmodelsComponent } from './readmodels/readmodels.component';
import { ModelEditComponent } from './model-edit/model-edit.component';
import { InitialComponent } from './initial/initial.component';
import { AppDetailComponent } from './app-detail/app-detail.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { EditAppComponent } from './editapp/editapp.component';
import { CreateEntityComponent } from './create-entity/create-entity.component';
import { EditEntityComponent } from './edit-entity/edit-entity.component';
import { AddFieldComponent } from './add-field/add-field.component';
import { ListFieldsComponent } from './list-fields/list-fields.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'app-detail',
    pathMatch: 'full'
  },
  {
    path: 'initial',
    component: InitialComponent,
    title:'init'
  },
  {
    path: 'new-app',
    component: NewProjectComponent,
    title:'Create New App'
  },
  {
    path: 'edit-app',
    component: EditAppComponent,
    title:'Edit App'
  },
  {
    path: '',
    component: DefaultLayoutComponent,

    children: [
      {
        path: 'app-detail',
        component: AppDetailComponent,
        title:'App Detail'
      },
      {
        path: 'entities/add',
        component: CreateEntityComponent,
        title:'Add Entity'
      },
      {
        path: 'entities/:id',
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
        title:'Fields'
      },
      // {
      //   path: 'models',
      //   component: ReadmodelsComponent,
      //   title:'Generator Model'
      // },
      // {
      //   path: 'model/:name/edit',
      //   component: ModelEditComponent,
      //   title:'Edit Model'
      // },
      // {
      //   path: 'generator',
      //   component: GeneratorModelComponent,
      //   title:'Add Model'
      // },
      {
        path: 'guide',
        component: GuideComponent,
        title:'Guide'
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
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
