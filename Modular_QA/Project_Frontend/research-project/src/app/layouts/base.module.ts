import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseAppRoutes } from './base.routing';
import { DashboardComponent } from './dashboard/dashboard.component';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {TableService } from './services/table.service';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule } from '@angular/common/http';
/* import { QueryBuilderModule } from 'angular2-query-builder'; */
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
<<<<<<< HEAD

=======
import { TestComponent } from './test/test.component';
import { GraphsComponent } from './graphs/graphs.component';
>>>>>>> rizwan_code


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BaseAppRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
   /*  QueryBuilderModule, */
  ],
  declarations: [
    DashboardComponent,
<<<<<<< HEAD
=======
    TestComponent,
    GraphsComponent,
>>>>>>> rizwan_code
    


  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,

  ],
   providers: [TableService],

})

export class BaseAppModule {}
