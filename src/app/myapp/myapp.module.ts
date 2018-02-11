import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyappRoutingModule} from './myapp-routing.module';
import {MyappComponent} from './myapp.component';
import {CubeComponent} from './component/cube/cube.component';
import {ListComponent} from './component/list/list.component';
import { ShapeGeometryComponent } from './component/shape-geometry/shape-geometry.component';
import { ShapeComponent } from './component/shape/shape.component';
import { SceneComponent } from './component/scene/scene.component';

@NgModule({
  imports: [
    CommonModule,
    MyappRoutingModule
  ],
  declarations: [
    MyappComponent,
    CubeComponent,
    ListComponent,
    ShapeGeometryComponent,
    ShapeComponent,
    SceneComponent]
})
export class MyappModule { }
