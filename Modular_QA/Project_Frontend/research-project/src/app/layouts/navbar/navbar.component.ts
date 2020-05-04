import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { TablesMap } from '../interface/tables.map'
import { QuerybuilderComponent } from '../querybuilder/querybuilder.component';
import { SpinnerService } from '../services/spinner.service';
import { TableService } from '../services/table.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild(QuerybuilderComponent /* #name or Type*/, {static: false}) child;
  public tableMapDrop: TablesMap[] = [];
  displayElement = true;
  showSpinner: boolean;
  constructor(public spinnerService: SpinnerService,private tableService:TableService,private _http: HttpClient) {
    
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
     
    this.tableService.doWork().subscribe(
      success => {
        console.log('Done');
      },
      error => {
        console.error('Error');
      }
    );

    /* this.webTableService.sendPostRequest(querySend).subscribe(
      res => {
        console.log(res);
      }
    );
    console.log(console.log('uiExpression ', JSON.stringify(querySend)));
   
 */
  }

  /* showAlert() : void {
    if (this.isVisible) { // if the alert is visible return
      return;
    } 
    this.isVisible = true;
    setTimeout(()=> this.isVisible = false,2500); // hide the alert after 2.5s
  } */


  ngAfterViewInit() {

  }
  

}
