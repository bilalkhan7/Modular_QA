import {
  Component, Input, OnChanges, OnInit, SimpleChanges,
  ChangeDetectionStrategy, ViewChild, EventEmitter, Output, ChangeDetectorRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueryBuilderConfig, QueryBuilderComponent } from 'angular2-query-builder';
import { TablesMap } from '../interface/tables.map';


@Component({
  selector: 'app-querybuilder',
  templateUrl: './querybuilder.component.html',
  styleUrls: ['./querybuilder.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,


})
export class QuerybuilderComponent implements OnChanges, OnInit {
  private _item:string="";
  @Input() tableMapDrop: TablesMap[];
  @Input()
  set isSubmitRequest(val: string) {
    if(val!==undefined)   
      {this._item=val;}
  }

  get getSubmitRequest(): string { 
    return this._item;
  }

  @Output() onSubmitData: EventEmitter<any> = new EventEmitter<any>();
  
  @ViewChild(QueryBuilderComponent, { static: false }) queryBuilder: QueryBuilderComponent;
  //  public tables_name: Array<string> = [];
  public currentConfig: QueryBuilderConfig[] = [];
  changeLog: string[] = [];
  public queryArray = [];
  public tableNameArray: string[] = [];
  public allowRuleset = true;
  public allowCollapse: boolean;
  public persistValueOnFieldChange = true;
  public queryCtrl: FormControl;
  public $table_name: string;
  @Input() config: QueryBuilderConfig;
  public query: { condition: string; rules: { field: any; operator: string; value: string; }[]; };
  public entity_table: string = '';
  private characterType: string = "character varying";
  private NumericType: string = "numeric";
  private IntergerType: string = "integer";
  private DateType: string = "date";
  private TimeType: string = "timestamp without time zone";
  displayElement = true;
  myOperatorMap = {
    string: ['=', '!=', 'contains', 'like', 'is null'],
    number: ['=', '!=', '>', '>=', '<', '<='],
    time: ['=', '!=', '>', '>=', '<', '<='],
    date: ['=', '!=', '>', '>=', '<', '<='],
    category: ['=', '!=', 'in', 'not in',],
    boolean: ['='],

  };
  constructor() {
    

  }



  ngOnInit() {


    

  }

 ngOnChanges(changes: SimpleChanges) {

    this.dropData();
    console.log("submit",this._item);
    if(this._item==="true")
    {
      this.submitData();
    }
  
  } 



  userExpression: String = 'Attribute = undefined';

  dropData() {

    this.displayElement=true;
    if (this.tableMapDrop.length > 0) {
      this.tableNameArray = [];
      this.queryArray=[];
      for (let i = 0; i < this.tableMapDrop.length; i++) {
        this.currentConfig[i] = (this.configData(this.tableMapDrop[i]));

      }
    }

  }

  configData(objeTable: TablesMap): QueryBuilderConfig {
    var columnArray = [];
    var dataTypesArray = [];
    var table_Name = '';
    table_Name = objeTable.table_name;
    var columnArrayLenght = objeTable.field.length;
    for (let i = 0; i <= columnArrayLenght - 1; i++) {
      columnArray.push(objeTable.field[i])
      dataTypesArray.push(objeTable.data_type[i])
    }
    columnArray.unshift('*');
    dataTypesArray.unshift('null');
  
    return this.configQueryBuilder(table_Name, columnArray, dataTypesArray);
  }

  configQueryBuilder(table_Name: string, columnArray: string[], dataTypesArray: string[]): QueryBuilderConfig {
    var fieldColumn;
    var fieldDataType;
    fieldColumn = columnArray.map(items => items.toString());
    fieldDataType = dataTypesArray.map(items => items.toString());

    return this.mapQueryConfig(table_Name, fieldColumn, fieldDataType);

  }

  mapQueryConfig(table_name: string, fieldColumn, fieldDataType): QueryBuilderConfig {

    var fieldsS = {};
    var config =
    {
      fields: {
      }
    }

    for (var i = 0; i < fieldColumn.length; i++) {


      if (fieldColumn[i] === '*') {
        fieldsS[fieldColumn[i]] =
        {
          name: [fieldColumn[i]],
          type: 'string',
          operator: 'is null',

        }
      }
      else {
        fieldsS[fieldColumn[i]] =
        {
          name: [fieldColumn[i]],
          type: this.MapDataTypes(fieldDataType[i]),
          entity: table_name,
          defaultValue: null
        }
      }
    }
    config.fields = fieldsS;
    return config;
  }



 public submitData() {
 
  console.log("submit data");
    let querySend ;
    let objeTable;
    console.log("query array",JSON.stringify(this.queryArray));
 /*    for(let i=0;i<this.queryArray.length;i++)
    {
      let objeTable={[this.tableMapDrop[i].table_name]:this.queryArray[i]};
      querySend[i]=objeTable;    
    } */
    if(this.tableMapDrop.length>0 && this.queryArray.length>0){
      for (let i = 0; i < this.queryArray.length; i++) {
        if(this.tableMapDrop[i].table_name!==undefined){
        objeTable = { [this.tableMapDrop[i].table_name]: this.queryArray[i] };
        console.log("Obj Table",objeTable);
        }
        else{
          alert("Error in rendireing table data");
        }
              

      } }
     // querySend[0] = objeTable;

    
    console.log("data",querySend);
    this.onSubmitData.emit(querySend);
    
  }




  MapDataTypes(type: string) {
    var datatype;


    if (type === this.characterType) {
      datatype = 'string';
    
    }

     if (type === this.NumericType || type === this.IntergerType) {
      datatype = 'number';
    

    }
    if (type === this.DateType) {

      datatype = 'date';

    }
    if (type === this.TimeType) {
      datatype = 'time';
     
    }
    if (type==='boolean'){
      datatype = 'boolean';
   

    }

    return datatype;
  }



  removeFromList(addedItem) {
    const index = this.tableMapDrop.indexOf(addedItem);
    this.tableMapDrop.splice(index);
    this.currentConfig.splice(index);
  }


  handleCloseButton(event: Event,value) {
    console.log(value);
    
    console.log("fields",this.currentConfig[value].fields);
    this.queryArray.splice(value,1)
    this.currentConfig.splice(value,1);
    this.tableMapDrop.splice(value,1); 
    //console.log("input field",this.currentConfig[value].getInputType.name);
   
 /*    
    console.log("current Config after",this.currentConfig);
    this.tableMapDrop.splice(value,1); */
  
    
  }
  ngAfterViewInit() {
    this.isSubmitRequest="false";
}
 


}
