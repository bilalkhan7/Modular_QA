import { Component, Input, ViewEncapsulation,OnChanges,DoCheck, OnInit, SimpleChanges,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { QueryBuilderClassNames, QueryBuilderConfig, Field, FieldMap } from 'angular2-query-builder';
import { QuerybuilderService } from '../services/querybuilder.service';
import { TablesMap } from '../interface/tables.map';



@Component({
  selector: 'app-querybuilder',
  templateUrl: './querybuilder.component.html',
  styleUrls: ['./querybuilder.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush

 
})
export class QuerybuilderComponent implements OnChanges,DoCheck,OnInit  {

  @Input() tableMapDrop:TablesMap[];

  public tables_name: Array<string> = [];
  public currentConfig: QueryBuilderConfig;
  public allowRuleset = false;
  public allowCollapse: boolean;
  public persistValueOnFieldChange = false; 
  public queryCtrl: FormControl;
 
  query = {
    condition: 'and',
    rules: [
      { field: 'attribute_name', operator: '', value: ''},
    ], 
  };

   config: QueryBuilderConfig = {
   /*  entities:{
      table_name:{name:'',value:'string',defaultField:'null' }
    }, */
   
    fields: {
      attribute_name:{name:'', type : 'string',options:[{name: 'Male', value: 'm'}]},
      }
  }
 
 
  constructor(private formBuilder: FormBuilder,private cd:ChangeDetectorRef) {
    
   }
 
  
 
  ngOnInit() {
   // console.log('value changed', this.tableMapDrop);
      /*  console.log('value changed', this.tableMapDrop); */
  }

  public mapDataToQueryBuilder() {

    console.log('table',this.tableMapDrop);
    this.tableMapDrop.map(items => 
      {for(let i=0;i<items.columns.length-1;i++){
        (
          console.log("Test Items",items.columns[i]),
          this.config.fields.attribute_name.name =items.columns[i],
          this.config.fields.attribute_name.type='string',
          this.config.fields.attribute_name.value=items.columns[i]
                
          )   
      }}
        
    );
    
      //console.log("Droped Results table details", this.tableMapDrop.map(items => items.columns))
      console.log("Config", this.config.fields.table_name)   
     
    }
  
   ngOnChanges(changes: SimpleChanges){
    
     // console.log("change detected");
   //  alert(changes);   
    
     // alert(JSON.stringify(val));             
  }
  ngDoCheck()
  {
    //this.cd.detectChanges();
    this.cd.markForCheck();
    this.mapDataToQueryBuilder();
  } 

 
}
