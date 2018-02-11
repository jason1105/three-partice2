import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyappComponent} from "./myapp.component";
import {CubeComponent} from "./component/cube/cube.component";
import {ShapeGeometryComponent} from "./component/shape-geometry/shape-geometry.component";
import {ShapeComponent} from "./component/shape/shape.component";

export const myappRoutes: Routes = [
  {
    path: "",
    component: MyappComponent,
    children: [
      {path: "cube", component: CubeComponent},
      {path: "shape-geometry", component: ShapeGeometryComponent},
      {path: "shape", component: ShapeComponent}
    ]
  }
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class MyappRoutingModule {
}
