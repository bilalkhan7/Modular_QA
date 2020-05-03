import {
  Component, Input, OnChanges, OnInit, SimpleChanges,
  ChangeDetectionStrategy, ViewChild, EventEmitter, Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueryBuilderConfig, FieldMap, QueryBuilderComponent } from 'angular2-query-builder';
import { TablesMap } from '../interface/tables.map';


@Component({
  selector: 'app-querybuilder',
  templateUrl: './querybuilder.component.html',
  styleUrls: ['./querybuilder.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,


})
export class QuerybuilderComponent implements OnChanges, OnInit {

  @Input() tableMapDrop: TablesMap[];
  @Output() onSubmitData: EventEmitter<any> = new EventEmitter<any>();
  
  @ViewChild(QueryBuilderComponent, { static: false }) queryBuilder: QueryBuilderComponent;
  //  public tables_name: Array<string> = [];
  public currentConfig: QueryBuilderConfig[] = [];
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
   // this.onSubmitData.emit(this.queryArray);
  }

  userExpression: String = 'Attribute = undefined';

  dropData() {

    this.displayElement=true;
    if (this.tableMapDrop.length > 0) {
      this.tableNameArray = [];
      for (let i = 0; i < this.tableMapDrop.length; i++) {
        this.currentConfig[i] = (this.configData(this.tableMapDrop[i]));

      }
    }

  }

  

  setqueryObj(fields: FieldMap) {
    var arrayFields = Object.keys(fields);
    

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
    console.log('column Array', columnArray);
    console.log('dataType')
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
          entity: table_name,
          type: 'string',
          operator: 'is null',

        }
      }
      else {
        fieldsS[fieldColumn[i]] =
        {
          name: [fieldColumn[i]],
          type: [this.MapDataTypes(fieldDataType[i])],
          entity: table_name,
          defaultValue: null
        }
      }
    }
    config.fields = fieldsS;
    return config;
  }





 public submitData() {
 
    let querySend = [];
    console.log("table ",JSON.stringify(this.tableMapDrop));
    console.log("query ",this.queryArray.length);
    if(this.tableMapDrop.length>0 && this.queryArray.length>0){
      for (let i = 0; i < this.queryArray.length; i++) {
        if(this.tableMapDrop[i].table_name!==undefined){
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




  MapDataTypes(type: string) {
    var datatype;
    var datatypeNumber;
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
  console.log('datatype'+datatype);
    return datatype;
  }



  removeFromList(addedItem) {
    const index = this.tableMapDrop.indexOf(addedItem);
    this.tableMapDrop.splice(index, 1);
  }


  handleCloseButton(event: Event,value) {
    console.log(event);
    //this.currentConfig[value].removeRuleSet;
    this.currentConfig.splice(value,1);
    const index = this.tableMapDrop.indexOf(value);
    console.log("table index"+index);
    this.tableMapDrop.splice(index, 1);
    //this.currentConfig.splice(value,1);
    
  }

 


}
