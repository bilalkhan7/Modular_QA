import { Component, OnInit,AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { TablesMap } from '../interface/tables.map'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent implements OnInit,AfterViewInit {
  public tableMapDrop: TablesMap[] = [];

  constructor() { }

  ngOnInit() 
  { 
    //console.log('value changed', this.tableMapDrop);
  }


  drop(event: CdkDragDrop<TablesMap[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (this.tableMapDrop.includes(event.item.data)) {
        return;
      } else {
        this.tableMapDrop=this.tableMapDrop.concat(event.item.data);
        //this.tableMapDrop.push(event.item.data);
      //  console.log('tables',this.tableMapDrop);
      }

    }


  }

  removeFromList(addedItem) {
    const index = this.tableMapDrop.indexOf(addedItem);
    this.tableMapDrop.splice(index, 1);
   }

   ngAfterViewInit() {}


}
