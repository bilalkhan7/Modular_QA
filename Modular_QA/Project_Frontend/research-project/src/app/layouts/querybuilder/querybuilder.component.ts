import { Component, Input, ViewEncapsulation, OnChanges, DoCheck, OnInit, SimpleChanges, ChangeDetectionStrategy, ViewChild, VERSION } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { QueryBuilderClassNames, QueryBuilderConfig, Field, FieldMap, Entity, QueryBuilderComponent, Rule, RuleSet, QueryInputDirective } from 'angular2-query-builder';
import { QuerybuilderService } from '../services/querybuilder.service';
import { TablesMap } from '../interface/tables.map';
//import { config } from 'rxjs';
import { TableService } from '../services/table.service'


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
  public tables_name: Array<string> = [];
  public currentConfig: any = [];
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
  constructor(private formBuilder: FormBuilder,private webTableService: TableService) {

  }



  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    // this.cd.reattach();
    this.MapData();
  }

  userExpression: String = 'Attribute = undefined';

  MapData() {
    var mapArray = [];
    var mapDataTypes = [];
    var fieldColumn;
    var fieldDataType;
    let name: string;
    let $uiExpression = {};

    // var uiExpression = {};
    var queryPost = {};
    var fieldsS = {};
    name = `Plunker! v${VERSION.full}`;



    this.tableMapDrop.map(item => this.entity_table = item.table_name.toString());
    var columnArrayLenght = this.tableMapDrop.map(item => item.field.length);

    //get attributes and map dataTypes
    for (let i = 0; i <= columnArrayLenght[0]; i++) {
      mapArray.push(this.tableMapDrop.map(item => item.field[i]))
      mapDataTypes.push(this.tableMapDrop.map(item => item.data_type[i]))

    }

    fieldColumn = mapArray.map(items => items.toString())
    fieldDataType = mapDataTypes.map(items => items.toString())


    for (var i = 0; i < fieldColumn.length - 1; i++) {

      this.config =
      {
        

        fields: {

        }
      }

      fieldsS[fieldColumn[i]] = {
        name: fieldColumn[i],
        type: this.MapDataTypes(fieldDataType[i]),
        //operator: this.MapOperators(fieldDataType[i]),
        entity: this.entity_table,
        options: ''
      }
      this.config.fields = fieldsS;
     // this.config.allowEmptyRulesets = true;
      // this.detect.markForCheck();
      console.log('config ', JSON.stringify(this.config))
      if (fieldColumn.length - 1 > 0) {
        // console.log('attributes length > 0');

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

    //  console.log('current Config'+this.currentConfig[i])
    // console.log(console.log('uiExpression ', JSON.stringify($uiExpression)));

  }


  passData($uiExpression) {
    let querySend = [];

    let objeTable = {[this.entity_table]: $uiExpression };
    querySend[0] = objeTable;

    this.webTableService.sendPostRequest(querySend).subscribe(
      res => {
        console.log(res);
      }
);
    console.log(console.log('uiExpression ', JSON.stringify(querySend)));

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





  private refreshField(field: string): void {
    // get the current rule
    const srcRule = this.queryBuilder.data.rules.find((x: Rule) => x.field === field) as Rule;

    if (srcRule) {

      // cache the current rule's selected value from our datasource
      const value = srcRule ? srcRule.value : undefined;

      // call change field to rebind new options to the UI
      this.queryBuilder.changeField(field, srcRule);

      // reset the previously selected value to the dropdown because changeField nulls out the value.
      srcRule.value = value;
    }
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
