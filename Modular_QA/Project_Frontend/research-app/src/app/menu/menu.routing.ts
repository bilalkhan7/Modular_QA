import { Routes } from '@angular/router'

import { ViewComponent } from './view/view.component'

export const MenuRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: 'view',
        component: ViewComponent
    }]
  }
]
