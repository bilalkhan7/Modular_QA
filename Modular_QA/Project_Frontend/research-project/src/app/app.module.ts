import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { QueryBuilderModule } from 'angular2-query-builder';
import { CustomHttpInterceptor } from './layouts/services/http-interceptor';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TableService } from './layouts/services/table.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { MatButtonModule, } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { QuerybuilderComponent } from './layouts/querybuilder/querybuilder.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import {TestComponent} from './layouts/test/test.component';
import {GraphsComponent} from './layouts/graphs/graphs.component';
import { TableComponent } from './layouts/table/table.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {MatDialogModule} from '@angular/material/dialog';
import {DialogComponent } from './layouts/table/popup/dialog/dialog.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormService} from './layouts/services/form.service';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    BrowserModule,
    QueryBuilderModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTableModule,
    Ng2SearchPipeModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    QuerybuilderComponent,
    DashboardComponent,
    TestComponent,
    GraphsComponent,
    TableComponent,
    DialogComponent

  ], exports: [
    MatButtonModule,
    MatIconModule,
    QueryBuilderModule,

  ],

  providers: [TableService,{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  },FormService],
  bootstrap: [AppComponent],
  entryComponents:[DialogComponent]
})
export class AppModule { }
