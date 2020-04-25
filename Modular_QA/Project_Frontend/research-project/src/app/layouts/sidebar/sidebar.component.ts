import { Component, OnInit } from '@angular/core'
import { TableService } from '../services/table.service'

import { TablesMap } from '../interface/tables.map'


@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [TableService]
})


export class SidebarComponent implements OnInit {
  public tableMap: TablesMap[];
  constructor(private webTableService: TableService) {
  }

  ngOnInit() {
    this.Tables();
  }



  Tables() {
    this.webTableService.fetchData().subscribe(response => this.tableMap = response);

  }










}
