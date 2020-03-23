import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NavbarComponent } from './navbar.component'
import { MatCardModule } from '@angular/material'
import { NgDragDropModule } from 'ng-drag-drop';
import { FormsModule } from '@angular/forms'

@NgModule({
    imports: [ RouterModule, CommonModule,MatCardModule,NgDragDropModule,FormsModule],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}