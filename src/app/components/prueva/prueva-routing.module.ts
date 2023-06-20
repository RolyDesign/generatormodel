import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuideComponent } from 'src/app/guide/guide.component';

const routes: Routes = [
  {
    path: '',
    component: GuideComponent,
    title:'Guide'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruevaRoutingModule { }
