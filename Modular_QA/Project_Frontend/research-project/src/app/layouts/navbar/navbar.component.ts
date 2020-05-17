import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { TablesMap } from '../interface/tables.map'
import { QuerybuilderComponent } from '../querybuilder/querybuilder.component';
import { SpinnerService } from '../services/spinner.service';
import { TableService } from '../services/table.service';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../interface/Response';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild(QuerybuilderComponent /* #name or Type*/, {static: false}) child;
  public tableMapDrop: TablesMap[] = [];
  responseData:ResponseData;
  public isSubmitRequest=false;
  displayElement = true;
  showSpinner: boolean;
  @Output() onSearchDataResult: EventEmitter<ResponseData> = new EventEmitter<ResponseData>();
  @Output() onClearHideTableView:EventEmitter<string>=new EventEmitter <string>();


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
       
      }

    }


  }




  clearView(hideview:boolean) {
    this.tableMapDrop = [];
    this.displayElement = hideview;
   
  }
  getJsonDataFromChild()
  {
    if(this.tableMapDrop.length>0)
    {
      this.isSubmitRequest=true;
     
    }
    else{
      alert("No Table Added for search");
    }
    
  
  }

  handleJsonDataChild(eventData:[]) {
    this.isSubmitRequest=false;
    var jsonArray=[];
    jsonArray=eventData;
    if(jsonArray!==undefined)
    {
    this.tableService.sendPostRequest().subscribe(
      data => {
        this.responseData=data
         this.onSearchDataResult.emit(this.responseData);
         this.clearView(false)
            },
      error => {
        console.error('Error');
      }
    );
    }

  }


 

  ngAfterViewInit() {
   /*  this.isSubmitRequest=false; */
  }
  

}
