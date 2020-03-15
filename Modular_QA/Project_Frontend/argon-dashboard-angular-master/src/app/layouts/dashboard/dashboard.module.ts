import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashBoardRoutes } from './dashboard-layout.routing';
import { DashboardComponent } from './dashboard.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { CenterPanelComponent } from './components/center-panel/center-panel.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DragComponentComponent } from './components/left-panel/drag-component/drag-component.component';
import { DropComponentComponent } from './components/center-panel/drop-component/drop-component.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(DashBoardRoutes),
    HttpClientModule,
    ClipboardModule,
    DragDropModule,
    FormsModule,
    Ng2SearchPipeModule


  ],
  declarations: [
    DashboardComponent,
    LeftPanelComponent,
    CenterPanelComponent,
    SearchComponentComponent,
    DragComponentComponent,
    DropComponentComponent


  ],
})
export class DashboardModule { }
