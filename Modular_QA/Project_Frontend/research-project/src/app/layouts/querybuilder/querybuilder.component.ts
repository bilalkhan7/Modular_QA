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
   private characterType:string="character varying";
   private NumericType:string="numeric";
   private IntergerType:string="integer";
   private DateType:string="date";
   private TimeType:string="timestamp without time zone";

  constructor(private formBuilder: FormBuilder) {

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
   var mapDataTypes=[];
   var fieldColumn;
   var fieldDataType;
   let name: string;
   var uiExpression = {};
   var queryPost={};
   var fieldsS = {}
   name = `Plunker! v${VERSION.full}`;
    this.tableMapDrop.map(item => this.entity_table=item.table_name.toString());
  //  console.log('droptable'+this.tableMapDrop);
    var columnArrayLenght = this.tableMapDrop.map(item => item.field.length);
   // console.log('droptable'+columnArrayLenght);
    for (let i = 0; i <= columnArrayLenght[0]; i++) {
      mapArray.push(this.tableMapDrop.map(item => item.field[i]))
      mapDataTypes.push(this.tableMapDrop.map(item => item.data_type[i]))
  
    }

    fieldColumn = mapArray.map(items => items.toString())
    fieldDataType = mapDataTypes.map(items => items.toString())  
   // console.log("field"+fieldDataType);
    this.config =
    {

      fields: {
              
      }
    }

    for (var i = 0; i < fieldColumn.length-1; i++) {

       fieldsS[fieldColumn[i]] = {
        name: fieldColumn[i],
        type: this.MapDataTypes(fieldDataType[i]),
        operator:this.MapOperators(fieldDataType[i]),
        entity:'currency',
        options: ''
      }
      this.config.fields = fieldsS;
     
     // this.detect.markForCheck();
      console.log('config ', JSON.stringify(this.config))
      if (fieldColumn.length-1 > 0) {
       // console.log('attributes length > 0');

       uiExpression = {
          condition: 'and',
          rules: [
            {
              field: this.config.fields[fieldColumn[i]],
            }
          ]
        }
      }
    }
      
    
    console.log(console.log('uiExpression ', JSON.stringify(this.userExpression)));

  }


MapDataTypes(type: String)
{
var datatype='';
//console.log('datatype',type);


if(type ===this.characterType )
{
  datatype = 'string';
 
}

 else if(type === this.NumericType || type===this.IntergerType)
 {
   datatype ='number'
  
 }
 else if(type === this.DateType)
{
  //console.log('type',type);
  datatype='date'
 ;
}
else if(type===this.TimeType)
{
datatype='date'
}
else
{
  datatype='string';
  
}

return datatype;
}

MapOperators(type:String)
{
  //type='';
var operators=[];
if(type ===this.characterType )
{
  operators =  ['=', 'like', '%'];
 }

 else if(type === this.NumericType || type===this.IntergerType)
 {
  operators =  ['=', '<', '>'];
  
 }
 else if(type === this.DateType)
{
  //console.log('type',type);
  operators =  ['=', 'between'];
 ;
}
else if(type===this.TimeType)
{
  operators =  ['=', 'like', '%'];
}
else
{
  operators =  ['=', '<', 'between'];
  
}

return operators;

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
