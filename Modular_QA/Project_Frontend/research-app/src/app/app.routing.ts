import { Routes } from '@angular/router'
import { AdminLayoutComponent } from './layouts/home/admin-layout.component'

export const AppRoutes: Routes = [
   {
    path: '',
    component: AdminLayoutComponent,
    children: [
     /*  {
      path: 'pricing',
      loadChildren: './pricing/pricing.module#PricingModule'
    }, */
     {
      path: 'dashboard',
      loadChildren: './layouts/base-app.module#BaseAppModule'
    }, 
    /* {
      path: 'settings',
      loadChildren: './settings/settings.module#SettingsModule'
    }, {
      path: 'beach_menu',
      loadChildren: './menu/menu.module#MenuModule'
    } */
  ]
  }
]
