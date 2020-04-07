import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';

export const BaseAppRoutes: Routes = [
  { path: 'dashboard',      component: DashboardComponent },
  { path: 'app-sidebar-cmp',      component: SidebarComponent },
];
