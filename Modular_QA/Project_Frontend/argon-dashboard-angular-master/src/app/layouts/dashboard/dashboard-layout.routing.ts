import { Routes } from '@angular/router';
import {LeftPanelComponent} from './components/left-panel/left-panel.component';
import {CenterPanelComponent} from './components/center-panel/center-panel.component';
import {SearchComponentComponent} from './components/search-component/search-component.component';
import {DragComponentComponent} from './components/left-panel/drag-component/drag-component.component';
import {DropComponentComponent} from './components/center-panel/drop-component/drop-component.component';


export const DashBoardRoutes: Routes = [
    { path: 'app-left-panel',      component: LeftPanelComponent },
    { path: 'app-center-panel',      component: CenterPanelComponent },
    { path: 'app-search-component',      component: SearchComponentComponent },
    { path: 'app-drag-component',      component: DragComponentComponent },
    { path: 'app-drop-component',      component: DropComponentComponent },
];
