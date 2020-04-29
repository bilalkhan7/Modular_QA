import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy, ViewChild, VERSION, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueryBuilderConfig, FieldMap, QueryBuilderComponent, Rule } from 'angular2-query-builder';
import { TablesMap } from '../interface/tables.map';
//import { config } from 'rxjs';
import { TableService } from '../services/table.service'


@Component({
  selector: 'app-querybuilder',
  templateUrl: './querybuilder.component.html',
  styleUrls: ['./querybuilder.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,


})
export class QuerybuilderComponent implements OnChanges, OnInit {

  @Input() tableMapDrop: TablesMap[];
       
  @ViewChild(QueryBuilderComponent, { static: false }) queryBuilder: QueryBuilderComponent;
  //  public tables_name: Array<string> = [];
  public currentConfig: QueryBuilderConfig[] = [];
  public tableNameArray=[];
  public allowRuleset = true;
  public allowCollapse: boolean;
  public persistValueOnFieldChange = true;
  public queryCtrl: FormControl;

  @Input() config: QueryBuilderConfig;
  public query: { condition: string; rules: { field: any; operator: string; value: string; }[]; };
  public entity_table: string = '';
  private characterType: string = "character varying";
  private NumericType: string = "numeric";
  private IntergerType: string = "integer";
  private DateType: string = "date";
  private TimeType: string = "timestamp without time zone";

  myOperatorMap = {
    string: [
      'equal',
      'not_equal',
      'begins_with',
      'not_begins_with',
      'contains',
      'not_contains',
      'ends_with',
      'not_ends_with'
    ],
    number: [
      'equal',
      'not_equal',
      'greater',
      'greater_or_equal',
      'between',
      'less',
      'less_or_equal',
      'begins_with',
      'not_begins_with',
      'contains',
      'not_contains',
      'ends_with',
      'not_ends_with'
    ],
    time: [
      'equal',
      'not_equal',
      'greater',
      'greater_or_equal',
      'between',
      'less',
      'less_or_equal',
      'begins_with',
      'not_begins_with',
      'contains',
      'not_contains',
      'ends_with',
      'not_ends_with'
    ],
    date: [
      'equal',
      'not_equal',
      'greater',
      'greater_or_equal',
      'between',
      'less',
      'less_or_equal'
    ],
    category: [
      'equal',
      'not_equal',
      'in',
      'not_in'
    ],
    boolean: [
      'equal',
      'not_equal'
    ],
    multiselect: [
      'in',
      'not_in'
    ]
  };
  constructor() {

  }



  ngOnInit() {
    //this.ref.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    
    this.dropData();
    // this.cd.reattach();
    //this.MapData();
  }

  userExpression: String = 'Attribute = undefined';

  dropData() {


    if (this.tableMapDrop.length > 0) {
      //console.log(this.tableMapDrop.length);
      
       
      for (let i = 0; i < this.tableMapDrop.length; i++) {
         // console.log('current '+this.currentConfig.entries.toString);
         this.tableNameArray.push(this.tableMapDrop[i].table_name);
          this.currentConfig[i] = (this.configData(this.tableMapDrop[i]));
          
          //console.log('after',this.currentConfig.length);
                
         //this.queryArray[i]=this.setqueryObj(this.currentConfig[i].fields);
         // console.log(this.queryArray[i]);
      }
    }

  }

  setqueryObj(fields: FieldMap) {
    var arrayFields = Object.keys(fields);
    var ruleSetArray = [];
     var query = {
      condition: 'and',
      rules: []
    }
      if (arrayFields.length > 0) {
      for (let i = 0; i < arrayFields.length; i++) 
      {
        if (arrayFields.length - 1 > 0) {
          ruleSetArray[i]={
            field: arrayFields[i],
          }
        }     
      }

      query.rules=ruleSetArray;
      return query;
     
   // console.log(ruleSetArray);
    //console.log($obj);
  }
}

configData(objeTable: TablesMap): QueryBuilderConfig {
  var columnArray = [];
  var dataTypesArray = [];
  var table_Name = '';
  table_Name = objeTable.table_name;
  var columnArrayLenght = objeTable.field.length;
    for (let i = 0; i <= columnArrayLenght-1; i++) {
    columnArray.push(objeTable.field[i])
    dataTypesArray.push(objeTable.data_type[i])
  }

  console.log('column Array',columnArray);
  return this.configQueryBuilder(table_Name, columnArray, dataTypesArray);
}

configQueryBuilder(table_Name: string, columnArray: string[], dataTypesArray: string[]): QueryBuilderConfig {
  var fieldColumn;
  var fieldDataType;
  fieldColumn = columnArray.map(items => items.toString());
  fieldDataType = dataTypesArray.map(items => items.toString());
  console.log('field Column',fieldColumn);
  return this.mapQueryConfig(table_Name, fieldColumn, fieldDataType);


}

mapQueryConfig(table_name: string, fieldColumn, fieldDataType): QueryBuilderConfig {

  var fieldsS = {};
 // var fieldArray=[];
  var config =
  {
    fields: {

    }
  }

console.log("fields",fieldsS);
  for (var i = 0; i < fieldColumn.length; i++) {

    fieldsS[fieldColumn[i]] =
    {
      name: [fieldColumn[i]],
      type: [this.MapDataTypes(fieldDataType[i])],
      entity:table_name,
      defaultValue:null
    }
    

    //console.log('config ', JSON.stringify(config))
    /* if (fieldColumn.length - 1 > 0) {
      $uiExpression = {
        condition: 'and',
        rules: [
          {
            field: config.fields[fieldColumn[i]],

          },

        ]
      }

    } */

  }
  console.log('config fields',config.fields);
  config.fields = fieldsS;
  console.log('config fields after ',config.fields);
  return config;
}




/* MapData() {
  var mapArray = [];
  var mapDataTypes = [];
  var fieldColumn;
  var fieldDataType;
  let name: string;
  let $uiExpression = {};
  var fieldsS = {};
  name = `Plunker! v${VERSION.full}`;

  this.tableMapDrop.map(item => this.entity_table = item.table_name.toString());
  var columnArrayLenght = this.tableMapDrop.map(item => item.field.length);

  for (let i = 0; i <= columnArrayLenght[0]; i++) {
    mapArray.push(this.tableMapDrop.map(item => item.field[i]))
    mapDataTypes.push(this.tableMapDrop.map(item => item.data_type[i]))
  }

  fieldColumn = mapArray.map(items => items.toString())
  fieldDataType = mapDataTypes.map(items => items.toString())

  console.log(fieldColumn.length);

  for (var i = 0; i < fieldColumn.length - 1; i++) {

    this.config =
    {
      fields: {

      }
    }
    // fieldsS = {};
    fieldsS[fieldColumn[i]] =
    {
      name: [fieldColumn[i]],
      type: [this.MapDataTypes(fieldDataType[i])],
      entity: [this.entity_table],
    }
    this.config.fields = fieldsS;
    console.log('config ', JSON.stringify(this.config))
    if (fieldColumn.length - 1 > 0) {
      $uiExpression = {
        condition: 'and',
        rules: [
          {
            field: this.config.fields[fieldColumn[i]],

          },

        ]
      }

    }

  }

  this.currentConfig[0] = this.config;


}
 */

passData($uiExpression) {
  console.log(JSON.stringify($uiExpression));
  /* let querySend = [];

  let objeTable = { [this.entity_table]: $uiExpression };
  querySend[0] = objeTable;

  this.webTableService.sendPostRequest(querySend).subscribe(
    res => {
      console.log(res);
    }
  );
  console.log(console.log('uiExpression ', JSON.stringify(querySend)));
 */
}


MapDataTypes(type: String) {
  var datatype = '';
  //console.log('datatype',type);


  if (type === this.characterType) {
    datatype = 'string';

  }

  else if (type === this.NumericType || type === this.IntergerType) {
    datatype = 'number'

  }
  else if (type === this.DateType) {
    //console.log('type',type);
    datatype = 'date'
      ;
  }
  else if (type === this.TimeType) {
    datatype = 'date'
  }
  else {
    datatype = 'string';

  }

  return datatype;
}








  /*   setExpressionParam(): FieldMap{
    
      let objList: Field[] = []; 
        this.Map.parameters.forEach(param => { 
              let x = { name: param.parameterName, type: 'string' }
              if (objList.indexOf(x) === -1) {
                objList.push(x); 
              }  
        }); 
  
      const arrayToObject = (array) =>
          array.reduce((obj, item) => {
            obj[item.name] = item
            return obj
          }, {})
      
      const fieldMap:FieldMap = arrayToObject(objList)
  
      console.log(objList);
      console.log(fieldMap); 
      return fieldMap; ;
    
  }  */


}
