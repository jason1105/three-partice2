import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyappComponent} from "./myapp.component";
import {CubeComponent} from "./component/cube/cube.component";

export const myappRoutes: Routes = [
  {
    path: "",
    component: MyappComponent,
    children: [
      {path: "cube", component: CubeComponent}
    ]
  }
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class MyappRoutingModule {
}
