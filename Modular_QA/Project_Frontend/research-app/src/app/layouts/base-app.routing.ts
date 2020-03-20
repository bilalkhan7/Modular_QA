import { Routes } from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component'

export const BaseAppRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: '',
        component: DashboardComponent
    }]
  }
]
