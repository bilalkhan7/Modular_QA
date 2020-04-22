import { Component, Input, ViewEncapsulation, OnChanges, DoCheck, OnInit, SimpleChanges, ChangeDetectionStrategy, ViewChild, VERSION } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { QueryBuilderClassNames, QueryBuilderConfig, Field, FieldMap, Entity, QueryBuilderComponent, Rule, RuleSet } from 'angular2-query-builder';
import { QuerybuilderService } from '../services/querybuilder.service';
import { TablesMap } from '../interface/tables.map';
//import { config } from 'rxjs';
import { TableService } from '../services/table.service'


@Component({
  selector: 'app-querybuilder',
  templateUrl: './querybuilder.component.html',
  styleUrls: ['./querybuilder.component.css'],
  changeDetection: ChangeDetectionStrategy.Default


})
export class QuerybuilderComponent implements OnChanges, OnInit {

  @Input() tableMapDrop: TablesMap[];
  @ViewChild(QueryBuilderComponent, { static: false }) queryBuilder: QueryBuilderComponent;
  public tables_name: Array<string> = [];
  public currentConfig: QueryBuilderConfig;
  public allowRuleset = true;
  public allowCollapse: boolean;
  public persistValueOnFieldChange = false;
  public queryCtrl: FormControl;
  @Input() config: QueryBuilderConfig;
  public query: { condition: string; rules: { field: any; operator: string; value: string; }[]; };
  public entity_table: string='';
  /* public fieldss:{
    [key: string]:
    {
      name: string;value?: string;type: string;nullable?: boolean;options?: {name: string;value: any;};Option: any[];
    operators?: string[];
    defaultValue?: any;
    defaultOperator?: any;
    entity?: string;
    validator?: (rule: Rule, parent: RuleSet) => any | null;
   }; Field: any;}; }; */


  /*   query = {
      condition: 'and',
      rules: [
        { field: 'test', operator: '', value: '' },
        { field: 'attribute_two', operator: '', value: '' },
        { field: 'attribute_three', operator: '', value: '' },
      ],
    };
   */

  constructor(private formBuilder: FormBuilder) {

  }



  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    // this.cd.reattach();
    this.MapDataTest();
  }



 /*  name: string;
  uiExpression = {};
  fieldsS = {} */
 AttributeDummy: any[] = [
            {
              "userColumnName": "Attribute 1",
              "colType": "multiselect",
              "isListType": "Y",
              "userColumnOptions": [
                { name: "Male", value: "m" },
                { name: "Female", value: "f" }
              ]
            },
            {
              "userColumnName": "Attribute 2",
              "colType": "date",
              "isListType": "N",
              "userColumnOptions": ""
            },
            {
              "userColumnName": "Attribute 3",
              "colType": "string",
              "isListType": "N",
              "userColumnOptions": ""
            },
            {
              "userColumnName": "Attribute 4",
              "colType": "number",
              "isListType": "N",
              "userColumnOptions": ""
            }
          ]
  userExpression: String = 'Attribute = undefined';
  
  MapDataTest() {
   var mapArray = [];
   var fieldColumn;
   let name: string;
   var uiExpression = {};
   var fieldsS = {}

   name = `Plunker! v${VERSION.full}`;


    this.tableMapDrop.map(item => this.entity_table=item.table_name.toString());
    console.log(this.tables_name);
    var columnArrayLenght = this.tableMapDrop.map(item => item.columns.length);
    for (let i = 0; i <= columnArrayLenght[0]; i++) {
      mapArray.push(this.tableMapDrop.map(item => item.columns[i]))
  
    }

    fieldColumn = mapArray.map(items => items.toString())
      
/* 
    this.config =
    {

      fields: {
       
        [fieldColumn[0]]: { name: fieldColumn[0], type: 'string', operators: ['=', '<=', '>'], entity: this.entity_table },
        [fieldColumn[1]]: { name: fieldColumn[1], type: 'string', operators: ['like', '=', '%'], entity:this.entity_table },
        [fieldColumn[2]]: { name: fieldColumn[2], type: 'string', operators: ['=', '<=', '>'], entity: this.entity_table },
        [fieldColumn[3]]: { name: fieldColumn[3], type: 'string', operators: ['=', '<=', '>'], entity: this.entity_table },
      }
    } */

    
    this.config =
    {

      fields: {
              
      }
    }

    for (var i = 0; i < fieldColumn.length-1; i++) {
       fieldsS[fieldColumn[i]] = {
        name: fieldColumn[i],
        type: 'string',
        options: ''
      }
      this.config.fields = fieldsS;
     // this.detect.markForCheck();
      console.log('config ', JSON.stringify(this.config))
      if (fieldColumn.length-1 > 0) {
        console.log('attributes length > 0');
        uiExpression = {
          condition: 'and',
          rules: [
            {
              field: [fieldColumn[i]],
             /*  operator: this.operators[0] */
            }
          ]
        }
      }
    }

   
      

 /*    this.query = {
      condition: 'and',
      rules: [
        { field: [fieldColumn[0]], operator: '', value: '' },
        { field: [fieldColumn[1]], operator: '', value: '' },
        { field: [fieldColumn[2]], operator: '', value: '' },
        { field: [fieldColumn[3]], operator: '', value: '' },
      ],
    };
 */

    // this.config.fields[tst].options = [
    //   {name: 'a', value:'1'}, 
    //   {name: 'b', value:'2'}, 
    //   {name: 'c', value:'3'}
    //  ]
    // this.refreshField(tst[]);
    //console.log('value changed', this.tableMapDrop);
    console.log("test", this.tableMapDrop);

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
}
