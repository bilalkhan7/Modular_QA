import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
import { LeftContainerComponent } from './components/left-container/left-container.component';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
import { CenterContainerComponent } from './components/center-container/center-container.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
   {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'app-left-container',      component: LeftContainerComponent },
  { path: 'app-center-container',      component: CenterContainerComponent },
  { path: 'app-search-component',      component: SearchComponentComponent },
  { path: 'app-header-contianer',      component: HeaderContainerComponent },
   {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
