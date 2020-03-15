import { Component } from '@angular/core';
import { TablesService } from './services/tables.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  people$;
  title = 'research_project';

  constructor(private webTableService: TablesService) {}

  fetchData = () => {
    this.people$ = this.webTableService.fetchData();
  }
}
