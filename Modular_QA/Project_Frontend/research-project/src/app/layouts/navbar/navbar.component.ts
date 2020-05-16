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
  public isSubmitRequest=false;
  displayElement = true;
  showSpinner: boolean;
  constructor(public spinnerService: SpinnerService,private tableService:TableService,private _http: HttpClient) {
    
   }

  ngOnInit() {
    setTimeout(() => {
      this.isSubmitRequest=false;
      console.log('value changed', this.tableMapDrop); 
  });
   
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
  getJsonDataFromChild()
  {
    if(this.tableMapDrop.length>0)
    {this.isSubmitRequest=true;}
    else{
      alert("No Table Added for search");
    }
    
    console.log("isSubmitData",this.isSubmitRequest);
  }

  handleJsonDataChild(eventData:[]) {
    this.isSubmitRequest=false;
    var jsonArray=[];
    jsonArray=eventData;
    if(jsonArray!==undefined)
    {
    console.log("data from child ", JSON.stringify(jsonArray));
    }
    
    this.tableService.sendPostRequest(jsonArray).subscribe(
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

 

  ngAfterViewInit() {
   /*  this.isSubmitRequest=false; */
  }
  

}
