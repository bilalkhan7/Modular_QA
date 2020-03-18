import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { TablesService } from './services/tables.service';
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
import { LeftContainerComponent } from './components/left-container/left-container.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { CenterContainerComponent } from './components/center-container/center-container.component';


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

  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderContainerComponent,
    LeftContainerComponent,
    HeaderContainerComponent,
    SearchComponentComponent,
    CenterContainerComponent
  ],
  providers: [TablesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
