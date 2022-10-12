import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquiposComponent } from './components/equipos/equipos.component';
import { HomeComponent } from './components/home/home.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  {path:'home', component: HomeComponent },
  {path:'report', component: ReportComponent},
  {path:'equipos', component: EquiposComponent},
  {path : '', pathMatch: 'full', redirectTo: 'home'},
  {path : '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
