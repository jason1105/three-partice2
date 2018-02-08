import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyappRoutingModule} from './myapp-routing.module';
import {MyappComponent} from './myapp.component';
import {CubeComponent} from './component/cube/cube.component';
import {ListComponent} from './component/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    MyappRoutingModule
  ],
  declarations: [MyappComponent, CubeComponent, ListComponent]
})
export class MyappModule { }
