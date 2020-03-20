import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
// import { MdIconModule, MdCardModule, MdInputModule, MdCheckboxModule, MdButtonModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// import { FlexLayoutModule } from '@angular/flex-layout'

import { MenuRoutes } from './menu.routing'

import { ViewComponent } from './view/view.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MenuRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ViewComponent
  ]
})

export class MenuModule {}
