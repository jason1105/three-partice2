import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyappRoutingModule} from './myapp-routing.module';
import {MyappComponent} from './myapp.component';
import {SceneComponent} from './component/scene/scene.component';
import {LoadSceneComponent} from './example/load-scene/load-scene.component';
import {CubeComponent} from "./example/cube/cube.component";
import {DrawBridgeComponent} from './example/draw-bridge/draw-bridge.component';
import {ShapeGeometryComponent} from "./example/shape-geometry/shape-geometry.component";
import {LoadBridgeComponent} from './example/load-bridge/load-bridge.component';
import {LoadSimpleComponent} from './example/load-simple/load-simple.component';
import {ThreeLoaderService} from "./example/load-simple/loader.service";

@NgModule({
  imports: [
    CommonModule,
    MyappRoutingModule
  ],
  declarations: [
    MyappComponent,
    CubeComponent,
    ShapeGeometryComponent,
    SceneComponent,
    LoadSceneComponent,
    DrawBridgeComponent,
    LoadBridgeComponent,
    LoadSimpleComponent],
  providers: [
    ThreeLoaderService
  ]
})
export class MyappModule {
}
