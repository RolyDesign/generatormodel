import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruevaRoutingModule } from './prueva-routing.module';
import { GuideComponent } from 'src/app/guide/guide.component';



@NgModule({
  declarations: [GuideComponent],
  imports: [
    CommonModule,
    PruevaRoutingModule
  ]
})
export class PruevaModule { }
