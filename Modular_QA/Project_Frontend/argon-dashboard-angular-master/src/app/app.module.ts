import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { TablesService } from './services/tables.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    DragDropModule,
    DashboardModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [TablesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
