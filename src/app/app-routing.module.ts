import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component'

import { MonitorComponent } from './pages/monitor/monitor.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'dashboard', component:DashboardComponent, data:{ breadcrumb:"Dashboard" }},
  { path: 'monitor', component:MonitorComponent, data:{ breadcrumb:"Monitor" }},
  { path: 'welcome', component:WelcomeComponent, data:{ breadcrumb:"welcome" }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
