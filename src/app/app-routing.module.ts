import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {myappRoutes} from "./myapp/myapp-routing.module";

// const routes: Routes = [
//   {
//     path: "",
//     component: AppComponent,
//     children: [{
//       path: 'myapp',
//       loadChildren: () => MyappModule
//     }]
//   }
//
// ];

const routes: Routes = [
  {
    path: 'myapp',
    children: [...myappRoutes]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
