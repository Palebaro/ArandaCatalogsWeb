import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultBooksComponent } from 'src/modules/consult-books/consult-books.component';
import { LoginAuthorizationComponent } from 'src/modules/login-authorization/login-authorization.component';
const routes: Routes = [
  {path: 'Autorizacion', component: LoginAuthorizationComponent},
  {path: 'Consulta', component: ConsultBooksComponent},
  {path: '',redirectTo: '/Autorizacion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
