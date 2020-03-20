import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../app.module'
// import { MdIconModule, MdCardModule, MdInputModule, MdCheckboxModule, MdButtonModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// import { FlexLayoutModule } from '@angular/flex-layout'
import { BaseAppRoutes } from './base-app.routing'
import { DashboardComponent } from './dashboard/dashboard.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BaseAppRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
  ]
})

export class BaseAppModule {}
