import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { TablesMap } from '../interface/tables.map'
import { QuerybuilderComponent } from '../querybuilder/querybuilder.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild(QuerybuilderComponent /* #name or Type*/, {static: false}) child;
  public tableMapDrop: TablesMap[] = [];
  displayElement = true;
  constructor() {
    
   }

  ngOnInit() {
    console.log('value changed', this.tableMapDrop);
  }


  drop(event: CdkDragDrop<TablesMap[]>) {
    this.displayElement = true;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (this.tableMapDrop.includes(event.item.data)) {
        return;
      } else {
        this.tableMapDrop = this.tableMapDrop.concat(event.item.data);
        //this.tableMapDrop.push(event.item.data);
        //  console.log('tables',this.tableMapDrop);
      }

    }


  }




  handleCloseButton(hideview:boolean) {
    this.tableMapDrop = [];
    this.displayElement = hideview;
    console.log("displayElement", this.displayElement);

  }

  handleJsonDataChild(eventData:[]) {
    var jsonArray=[];
    jsonArray=eventData;
    console.log("data from child ", JSON.stringify(jsonArray));

    /* this.webTableService.sendPostRequest(querySend).subscribe(
      res => {
        console.log(res);
      }
    );
    console.log(console.log('uiExpression ', JSON.stringify(querySend)));
   
 */
  }

  ngAfterViewInit() {

  }
  

}
