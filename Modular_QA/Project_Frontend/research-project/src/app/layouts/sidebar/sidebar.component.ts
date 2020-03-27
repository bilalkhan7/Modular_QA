import { Component, OnInit } from '@angular/core'
import { TableService } from '../services/table.service'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
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
    this.getTables();
  }

  getTables() {
    this.webTableService.fetchData().subscribe(response => this.tableMap = response);
    /*   console.log('results', this.tableMap[0].columns); */
  }

 /*  drop(event: CdkDragDrop<TablesMap[]>) {
    moveItemInArray(this.tableMap, event.previousIndex, event.currentIndex);
    console.log('item' + event.currentIndex);
  } */


}
