import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyappRoutingModule } from './myapp-routing.module';
import { MyappComponent } from './myapp.component';

@NgModule({
  imports: [
    CommonModule,
    MyappRoutingModule
  ],
  declarations: [MyappComponent]
})
export class MyappModule { }
