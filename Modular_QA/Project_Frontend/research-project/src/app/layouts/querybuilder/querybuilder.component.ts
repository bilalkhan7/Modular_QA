import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
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

  @ViewChild(QueryBuilderComponent, { static: false }) queryBuilder: QueryBuilderComponent;
  //  public tables_name: Array<string> = [];
  public currentConfig: QueryBuilderConfig[] = [];
  public queryArray = [];
  public tableNameArray: string[] = [];
  public allowRuleset = true;
  public allowCollapse: boolean;
  public persistValueOnFieldChange = true;
  public queryCtrl: FormControl;
  public $table_name:string;
  @Input() config: QueryBuilderConfig;
  public query: { condition: string; rules: { field: any; operator: string; value: string; }[]; };
  public entity_table: string = '';
  private characterType: string = "character varying";
  private NumericType: string = "numeric";
  private IntergerType: string = "integer";
  private DateType: string = "date";
  private TimeType: string = "timestamp without time zone";

  myOperatorMap = {
    string: ['=', '!=', 'contains', 'like','is null'],
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
     }

  userExpression: String = 'Attribute = undefined';

  dropData() {


    if (this.tableMapDrop.length > 0) {
      this.tableNameArray=[];
      for (let i = 0; i < this.tableMapDrop.length; i++) {
        this.currentConfig[i] = (this.configData(this.tableMapDrop[i]));
       
      }
    }

  }

  setqueryObj(fields: FieldMap) {
    var arrayFields = Object.keys(fields);
    this.$table_name='';
    this.$table_name=arrayFields[0];
    console.log(this.$table_name);
   /*  var ruleSetArray = [];
    var query = {
      condition: 'and',
      rules: []
    }
    if (arrayFields.length > 0) {
      for (let i = 0; i < arrayFields.length; i++) {
        if (arrayFields.length - 1 > 0) {
          ruleSetArray[i] = {
            field: arrayFields[i],
          }
        }
      }

      query.rules = ruleSetArray;
      return query;

    } */
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
    console.log('column Array',columnArray);
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

      if(fieldColumn[i]==='*')
      {
        fieldsS[fieldColumn[i]] =
        {
          name: [fieldColumn[i]],
          entity: table_name,
          type:'string',
          operator:'is null',          
          
        }  
      }
      else{
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





  passData(queryArray) {

    let querySend = [];
    for(let i=0;i<queryArray.length;i++)
    {
      let objeTable={[this.tableMapDrop[i].table_name]:queryArray[i]};
      querySend[i]=objeTable;    
    }
    console.log("tableMap"+JSON.stringify(querySend));
  //  console.log("queryArray"+queryArray);
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

  


  MapDataTypes(type:string) {
    var datatype = '';
    
    if (type === this.characterType) {
      datatype = 'string';

    }

    else if (type === this.NumericType || type === this.IntergerType) {
      datatype = 'number';

    }
    else if (type === this.DateType) {

      datatype = 'date';
        ;
    }
    else if (type === this.TimeType) {
      datatype = 'date';
    }
    else {
      datatype = 'string';

    }

    return datatype;
  }



  removeFromList(addedItem) {
    const index = this.tableMapDrop.indexOf(addedItem);
    this.tableMapDrop.splice(index, 1);
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
