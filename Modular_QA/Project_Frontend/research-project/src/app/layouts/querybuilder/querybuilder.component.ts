import {
  Component, Input, OnChanges, OnInit, SimpleChanges,
  ChangeDetectionStrategy, ViewChild, EventEmitter, Output, SimpleChange,ChangeDetectorRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueryBuilderConfig, FieldMap, QueryBuilderComponent } from 'angular2-query-builder';
import { TablesMap } from '../interface/tables.map';


@Component({
  selector: 'app-querybuilder',
  templateUrl: './querybuilder.component.html',
  styleUrls: ['./querybuilder.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,


})
export class QuerybuilderComponent implements OnChanges, OnInit {
  private _item:boolean;
  @Input() tableMapDrop: TablesMap[];
  @Input()
  set isSubmitRequest(val: boolean) {
    if(val!==undefined)   
      {this._item=val;}
  }

  get getSubmitRequest(): boolean { 
    return this._item;
  }

  @Output() onSubmitData: EventEmitter<any> = new EventEmitter<any>();
  
  @ViewChild(QueryBuilderComponent, { static: false }) queryBuilder: QueryBuilderComponent;
  //  public tables_name: Array<string> = [];
  public currentConfig: QueryBuilderConfig[] = [];
  changeLog: string[] = [];
  public queryArray = [];
  public tableNameArray: string[] = [];
  public allowRuleset = false;
  public allowCollapse: boolean;
  public persistValueOnFieldChange = true;
  public queryCtrl: FormControl;
  public $table_name: string;
  @Input() config: QueryBuilderConfig;
 public entity_table: string = '';
  private characterType: string = "character varying";
  private NumericType: string = "numeric";
  private IntergerType: string = "integer";
  private DateType: string = "date";
  private TimeType: string = "timestamp without time zone";
  displayElement = true;
  query = {
    condition: 'and',
    rules: [{
      "condition": "and",
      "rules": [
        
      ]
    }
     
    ]
  }
  myOperatorMap = {
    string: ['=', '!=', 'contains', 'like', 'is null'],
    number: ['=', '!=', '>', '>=', '<', '<='],
    time: ['=', '!=', '>', '>=', '<', '<='],
    date: ['=', '!=', '>', '>=', '<', '<='],
    category: ['=', '!=', 'in', 'not in',],
    boolean: ['='],

  };
  constructor(private cd: ChangeDetectorRef) {
  }

 
  ngOnInit() {
    this.isSubmitRequest=false;
    
  //  this.queryArray.push(this.query); 

  }

 ngOnChanges(changes: SimpleChanges) {

    this.dropData();
    if(this._item)
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
        this.queryArray[i]=this.query;
        console.log("query array",this.queryArray[i])
        //this.queryArray.push(this.query); 
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
      fields: 
      { 

      }
    }

    for (var i = 0; i < fieldColumn.length; i++) {

      if (fieldColumn[i] === '*') {
        fieldsS[fieldColumn[i]] =
        {
          name: [fieldColumn[i]],
          entity: table_name,
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
          defaultValue: null,
         
        }
      }
    }
    config.fields = fieldsS;
    
    return config;
  }



 public submitData() {
 
    let querySend = [];
    if(this.tableMapDrop.length>0 && this.queryArray.length>0){
     
      for (let i = 0; i < this.queryArray.length; i++) {
        if(this.tableMapDrop[i].table_name!==undefined){
   /*       if(this.queryArray[i]['rules'].length<1)
         {this.queryArray[i]['rules'].push(emptyRules)} */
         //this.addEmptyRulset(this.queryArray[i])
        let objeTable = { [this.tableMapDrop[i].table_name]: this.queryArray[i] };
        querySend[i] = objeTable;
        }
        else{
          alert("Error in rendireing table data");
        }
        
      
      }
    }
   
    this.onSubmitData.emit(querySend);
    
  }

/* addEmptyRulset( objeTable:Object):object{
  var objRules=[];
  let newObjTable={}
  newObjTable=objeTable
  var keys=Object.keys(newObjTable);
  var objeTableName=newObjTable[keys[0]];
  var objRules=objeTableName["rules"];
   if(objRules.length===0)
   {
    var emptyRules={"condition":"and","rules":[]};
    objRules.push(emptyRules)
   }
  console.log("Rules",objRules);
return objeTable;
}
 */

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



  handleCloseButton(event: Event,value) {
    this.queryArray.splice(value,1)
    this.currentConfig.splice(value,1);
    this.tableMapDrop.splice(value, 1);
  
    
  }
  ngAfterViewInit() {
    this.isSubmitRequest=false;
}
 


}
