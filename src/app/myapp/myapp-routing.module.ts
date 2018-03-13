import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyappComponent} from "./myapp.component";
import {SceneComponent} from "./component/scene/scene.component";
import {LoadSceneComponent} from "./example/load-scene/load-scene.component";
import {CubeComponent} from "./example/cube/cube.component";
import {DrawBridgeComponent} from "./example/draw-bridge/draw-bridge.component";
import {ShapeGeometryComponent} from "./example/shape-geometry/shape-geometry.component";
import {LoadBridgeComponent} from "./example/load-bridge/load-bridge.component";
import {LoadCoinvSimpleComponent} from "./example/load-coinv-simple/load-coinv-simple.component";

export const myappRoutes: Routes = [
  {
    path: "",
    component: MyappComponent,
    children: [
      {path: "cube", component: CubeComponent},
      {path: "shape-geometry", component: ShapeGeometryComponent},
      {path: "scene", component: SceneComponent},
      {path: "load-scene", component: LoadSceneComponent},
      {path: "draw-bridge", component: DrawBridgeComponent},
      {path: "load-bridge", component: LoadBridgeComponent},
      {path: "load-coinv-simple", component: LoadCoinvSimpleComponent}
    ]
  }
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class MyappRoutingModule {
}
