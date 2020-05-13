import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
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
  public tableMapDrop: TablesMap[] = [];
  public isSubmitRequest="false";
  displayElement = true;
  showSpinner: boolean;
  @Output() onSearchDataResult: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClearHideTableView:EventEmitter<string>=new EventEmitter <string>();
  tableArray=  [
    {
      "a_unit_sales": "3.0000",
      "b_fname": "Sharon",
      "a_unit_discount": "3.0000",
      "b_name": "Sharon",
      "c_unit_share": "3.0000",
      "d_name_test": "Sharon",

    },
    {
      "a_unit_sales": "3.0000",
      "b_fname": "Sharon",
      "a_unit_discount": "3.0000",
      "b_name": "Sharon",
      "c_unit_share": "3.0000",
      "d_name_test": "Sharon",
    },
    {
      "a_unit_sales": "3.0000",
      "b_fname": "Sharon",
      "a_unit_discount": "3.0000",
      "b_name": "Sharon",
      "c_unit_share": "3.0000",
      "d_name_test": "Sharon",
    }, {
      "a_unit_sales": "3.0000",
      "b_fname": "Sharon",
      "a_unit_discount": "3.0000",
      "b_name": "Sharon",
      "c_unit_share": "3.0000",
      "d_name_test": "Sharon",
    }, {
      "a_unit_sales": "3.0000",
      "b_fname": "Sharon",
      "a_unit_discount": "3.0000",
      "b_name": "Sharon",
      "c_unit_share": "3.0000",
      "d_name_test": "Sharon",
    }, {
      "a_unit_sales": "3.0000",
      "b_fname": "Sharon",
      "a_unit_discount": "3.0000",
      "b_name": "Sharon",
      "c_unit_share": "3.0000",
      "d_name_test": "Sharon",
    }, {
      "a_unit_sales": "3.0000",
      "b_fname": "Sharon",
      "a_unit_discount": "3.0000",
      "b_name": "Sharon",
      "c_unit_share": "3.0000",
      "d_name_test": "Sharon",
    }, {
      "a_unit_sales": "3.0000",
      "b_fname": "Sharon",
      "a_unit_discount": "3.0000",
      "b_name": "Sharon",
      "c_unit_share": "3.0000",
      "d_name_test": "Sharon",
    }, {
      "a_unit_sales": "3.0000",
      "b_fname": "Sharon",
      "a_unit_discount": "3.0000",
      "b_name": "Sharon",
      "c_unit_share": "3.0000",
      "d_name_test": "Sharon",
    },
    {
      "a_unit_sales": "3.0000",
      "b_fname": "Sharon",
      "a_unit_discount": "3.0000",
      "b_name": "Sharon",
      "c_unit_share": "3.0000",
      "d_name_test": "Sharon",
    }];


  constructor(private tableService:TableService,private _http: HttpClient) {
    
   }

  ngOnInit() {

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




  handleCloseButton(hideview:boolean) {
    this.tableMapDrop = [];
    this.displayElement = hideview;
    this.onClearHideTableView.emit('false');
    
  }
  getJsonDataFromChild()
  {
    if(this.tableMapDrop.length>0)
    {
      this.isSubmitRequest="true"
      console.log("get json data ",this.isSubmitRequest);
    }
    else{
      alert("No Table Added for search");
    }
    
    console.log("isSubmitData",this.isSubmitRequest);
  }

  handleJsonDataChild(eventData:[]) {
    this.isSubmitRequest="false";
    var jsonArray=[];
    jsonArray=eventData;
    if(jsonArray!==undefined)
    {
    console.log("data from child ", JSON.stringify(jsonArray));
  
    
    this.tableService.doWork().subscribe(
      success => {
   
        this.onSearchDataResult.emit(this.tableArray);
        console.log('Done');
      },
      error => {
        console.error('Error');
      }
    );
  }

 
  }

 

  ngAfterViewInit() {
    this.isSubmitRequest="false";
   /*  this.isSubmitRequest=false; */
  }
  

}
