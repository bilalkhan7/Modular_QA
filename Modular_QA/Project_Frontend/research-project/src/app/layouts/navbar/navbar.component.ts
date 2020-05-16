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
    
  
  }

  handleJsonDataChild(eventData:[]) {
    this.isSubmitRequest=false;
    var jsonArray=[];
    jsonArray=eventData;
    if(jsonArray!==undefined)
    {
   console.log("data from child ", JSON.stringify(jsonArray));
  //  console.log("send json",JSON.stringify(this.addEmptyRulset(jsonArray))); 
    this.tableService.doWork().subscribe(
      data => {
        this.responseData=data
       this.mapData(this.responseData);
        // this.onSearchDataResult.emit(this.tableArray);
       // console.log('Done'+JSON.stringify(this.responseData));
      },
      error => {
        console.error('Error');
      }
    );
    }

  }


  mapData(objResponse:ResponseData)
  {

console.log("Columns Array",objResponse["columns_array"]);
console.log("Data Array",objResponse["data"]);
console.log("error",objResponse["error"]);
console.log("error_status",objResponse["error_status"]);
console.log("query",objResponse["query"]);

  }


   addEmptyRulset( jsonArray:any []):any[]{
    var objRules:any[];
    let newObjTable={}
    
    
    for (let i=0;i<jsonArray.length;i++)
    {
      var keys=Object.keys(jsonArray[i]);
      console.log("keys",keys);
      var objeTable=jsonArray[i][keys[i]];
      console.log("obj Table",objeTable);
      objRules=objeTable["rules"];
        if(objRules.length===0)
       {
        var emptyRules={"condition":"and","rules":[]};
        objRules.push(emptyRules);
        objeTable["rules"]=objRules;
        jsonArray[i][keys[i]]=objeTable;
        jsonArray[i]={[keys[i]]:jsonArray[i][keys[i]]}
       }  
      //console.log("Rules",objRules);
    }
    
   return jsonArray; 
  }
   

 

  ngAfterViewInit() {
   /*  this.isSubmitRequest=false; */
  }
  

}
