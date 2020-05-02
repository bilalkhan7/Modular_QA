import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { QueryBuilderConfig, FieldMap, QueryBuilderComponent } from 'angular2-query-builder';
import { TablesMap } from '../interface/tables.map';
import { TableService } from '../services/table.service';


@Component({
  selector: 'app-querybuilder',
  templateUrl: './querybuilder.component.html',
  styleUrls: ['./querybuilder.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [TableService]

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
  queryFormGroup:FormGroup;
  queryCtrl: FormControl;
  qurybuilder = new FormArray([]);

  myOperatorMap = {
    string: ['=', '!=', 'contains', 'like', 'is null'],
    number: ['=', '!=', '>', '>=', '<', '<='],
    time: ['=', '!=', '>', '>=', '<', '<='],
    date: ['=', '!=', '>', '>=', '<', '<='],
    category: ['=', '!=', 'in', 'not in',],
    boolean: ['='],

  };

  constructor( private formBuilder: FormBuilder,private webTableService: TableService) {
   
    this.queryFormGroup = formBuilder.group({
      query: formBuilder.array([])
   });
   
    this.queryCtrl = this.formBuilder.control(this.queryArray);

  }

  


  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.dropData();
  }

  userExpression: String = 'Attribute = undefined';

  dropData() {


    if (this.tableMapDrop.length > 0) {
      this.tableNameArray = [];
      for (let i = 0; i < this.tableMapDrop.length; i++) {
        this.currentConfig[i] = (this.configData(this.tableMapDrop[i]));

      }
    }

  }

  addSkill() {
    this.queryArray.push(new FormControl(''));
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





  passData(queryArray) {

    let querySend = [];
    for (let i = 0; i < queryArray.length; i++) {
      let objeTable = { [this.tableMapDrop[i].table_name]: queryArray[i] };
      querySend[i] = objeTable;
    }
    console.log("tableMap" + JSON.stringify(querySend));
  
    this.webTableService.sendPostRequest(querySend).subscribe(
      res => {
        console.log(res);
      }
    );
   // console.log(console.log('uiExpression ', JSON.stringify(querySend)));
  
  }




  MapDataTypes(type: string) {
    var datatype = '';
    var characterType: string = "character varying";
    var NumericType: string = "numeric";
    var IntergerType: string = "integer";
    var DateType: string = "date";
    var BooleanType: string = "boolean";
    var TimeType: string = "timestamp without time zone";

    if (type === characterType) {
      datatype = 'string';

    }

    else if (type === NumericType || type === IntergerType) {
      datatype = 'number';

    }
    else if (type === DateType) {

      datatype = 'date';
      ;
    }
    else if (type === TimeType) {
      datatype = 'date';
    }
    else if (type === BooleanType) {
      datatype = 'boolean';
    }
    else {
      datatype = 'string';

    }

    return datatype;
  }



  removeFromList(index) {
    // const index = this.tableMapDrop.indexOf(addedItem);
    this.tableMapDrop.splice(index, 1);
    this.currentConfig[index].removeRuleSet;
    this.currentConfig.slice(index, 1);
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
