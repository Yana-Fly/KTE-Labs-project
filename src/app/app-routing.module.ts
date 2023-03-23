import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./views/main/main.component";

const routes: Routes = [{
  path: '',
  children: [
    {path: '', component: MainComponent},
    {path: '', loadChildren: () => import('./views/catalog/catalog.module').then(m => m.CatalogModule)}
  ],
},
  { path: '**', redirectTo: ''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
