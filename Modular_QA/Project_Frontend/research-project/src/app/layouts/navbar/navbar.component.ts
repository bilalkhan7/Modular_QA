import { Component, OnInit, ElementRef } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'
import { TablesMap } from '../interface/tables.map'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  public tableMapDrop: TablesMap[] = [];


      drop(event: CdkDragDrop<TablesMap[]>) {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
           if (this.tableMapDrop.includes(event.item.data)) {
            return;
          } else {
            this.tableMapDrop.push(event.item.data);
            console.log('array' + this.tableMapDrop[0].table_name)
          }
        }


      }

}
