import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultProductsComponent } from 'src/modules/consult-products/consult-products.component';
const routes: Routes = [
  {path: 'Consulta', component: ConsultProductsComponent},
  {path: '',redirectTo: '/Consulta', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
