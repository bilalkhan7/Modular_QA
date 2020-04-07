import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'
import { TablesMap } from '../interface/tables.map'
import {MatSelect} from '@angular/material/select';
import { FormBuilder, FormControl } from '@angular/forms';
import { QueryBuilderClassNames, QueryBuilderConfig } from 'angular2-query-builder';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  public tableMapDrop: TablesMap[] = [];
  public currentConfig: QueryBuilderConfig;
  public allowRuleset = false;
  public allowCollapse: boolean;
  public persistValueOnFieldChange = false;
  public queryCtrl: FormControl;
  public tables_name: Array<string> = [];
  public columns: Array<string> = [];
  public query = {
    condition: 'and',
    rules: [
      {field: 'age', operator: '<=', entity: 'physical'},
      {field: 'birthday', operator: '=', value: new Date(), entity: 'nonphysical'},
      {
        condition: 'or',
        rules: [
          {field: 'gender', operator: '=', entity: 'physical'},
          {field: 'occupation', operator: 'in', entity: 'nonphysical'},
          {field: 'school', operator: 'is null', entity: 'nonphysical'},
          {field: 'notes', operator: '=', entity: 'nonphysical'}
        ]
      }
    ]
  };

  public entityConfig: QueryBuilderConfig = {
    entities: {
      physical: {name: 'Physical Attributes'},
      nonphysical: {name: 'Nonphysical Attributes'}
    },
    fields: {
      age: {name: 'Age', type: 'number', entity: 'physical'},
      gender: {
        name: 'Gender',
        entity: 'physical',
        type: 'category',
        options: [
          {name: 'Male', value: 'm'},
          {name: 'Female', value: 'f'}
        ]
      },
      name: {name: 'Name', type: 'string', entity: 'nonphysical'},
      notes: {name: 'Notes', type: 'textarea', operators: ['=', '!='], entity: 'nonphysical'},
      educated: {name: 'College Degree?', type: 'boolean', entity: 'nonphysical'},
      birthday: {name: 'Birthday', type: 'date', operators: ['=', '<=', '>'],
        defaultValue: (() => new Date()), entity: 'nonphysical'
      },
      school: {name: 'School', type: 'string', nullable: true, entity: 'nonphysical'},
      occupation: {
        name: 'Occupation',
        entity: 'nonphysical',
        type: 'category',
        options: [
          {name: 'Student', value: 'student'},
          {name: 'Teacher', value: 'teacher'},
          {name: 'Unemployed', value: 'unemployed'},
          {name: 'Scientist', value: 'scientist'}
        ]
      }
    }
  };

  public config: QueryBuilderConfig = {
    fields: {
      age: {name: 'Age', type: 'number'},
      gender: {
        name: 'Gender',
        type: 'category',
        options: [
          {name: 'Male', value: 'm'},
          {name: 'Female', value: 'f'}
        ]
      },
      name: {name: 'Name', type: 'string'},
      notes: {name: 'Notes', type: 'textarea', operators: ['=', '!=']},
      educated: {name: 'College Degree?', type: 'boolean'},
      birthday: {name: 'Birthday', type: 'date', operators: ['=', '<=', '>'],
        defaultValue: (() => new Date())
      },
      school: {name: 'School', type: 'string', nullable: true},
      occupation: {
        name: 'Occupation',
        type: 'category',
        options: [
          {name: 'Student', value: 'student'},
          {name: 'Teacher', value: 'teacher'},
          {name: 'Unemployed', value: 'unemployed'},
          {name: 'Scientist', value: 'scientist'}
        ]
      }
    }
  };



  constructor(private formBuilder: FormBuilder) {
    this.queryCtrl = this.formBuilder.control(this.query);
    this.currentConfig = this.config;
  }

      drop(event: CdkDragDrop<TablesMap[]>) {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
           if (this.tableMapDrop.includes(event.item.data)) {
            return;
          } else {
            this.tableMapDrop.push(event.item.data);
            this.updateRules(this.tableMapDrop);
          }
        }


      }
      updateRules(_tableMapDrop: TablesMap[]) {
        this.tables_name =[];
        for ( let i = 0; i < _tableMapDrop.length; i++) {
          this.tables_name.push(_tableMapDrop[i].table_name);
          console.log('table_name', JSON.stringify(
            this.tables_name,      // the object to stringify
            null, // a function or array transforming the result
            ' '    // prettyprint indentation spaces
          ));

        }

      }

      removeFromList(addedItem) {
      const index = this.tableMapDrop.indexOf(addedItem);
      this.tableMapDrop.splice(index, 1); // Removes one element, starting from index
       /*  console.log('array delete' + this.tableMapDrop.splice(index, 0)) */
      }


      switchModes(event: Event) {
        this.currentConfig = (<HTMLInputElement>event.target).checked ? this.entityConfig : this.config;
      }

      changeDisabled(event: Event) {
        (<HTMLInputElement>event.target).checked ? this.queryCtrl.disable() : this.queryCtrl.enable();
      }
}
