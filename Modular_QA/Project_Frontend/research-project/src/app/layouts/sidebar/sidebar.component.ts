import { Component, OnInit, ViewChild } from '@angular/core'
import { TableService } from '../services/table.service'
import { TablesMap } from '../interface/tables.map'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [TableService]
})


export class SidebarComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger)
  private trigger: MatAutocompleteTrigger;
  
  selectedIndex: number;
  myControl = new FormControl();
  filteredOptions: Observable<TablesMap[]>;
  public tableMap: TablesMap[];
  public tableSearchMap:TablesMap[];
  tableObj:TablesMap;
  constructor(private webTableService: TableService) {
   
  }

  ngOnInit() {
    this.Tables();
  
  }

  Tables() {
    this.webTableService.fetchData().subscribe(response => {
           this.tableMap = response
          this.tableSearchMap=response
           this.filteredOptions = this.myControl.valueChanges
           .pipe(
             startWith(''),
             map(value => typeof value === 'string' ? value : value.table_name),
             map(table_name => table_name ? this._filter(table_name) : this.tableSearchMap.slice())
           ); 
    });

  }
  getConcatString(value:string)
  {
    return value.replace( /_/g, " " )
  }

  select(index: number) {
    this.selectedIndex = index;
  }

  displayFn(table: TablesMap): string {
    return table && table.table_name ? table.table_name : '';
  }

  private _filter(name: string): TablesMap[] {
    const filterValue = name.toLowerCase();
    return this.tableSearchMap.filter(option => option.table_name.toLowerCase().indexOf(filterValue) === 0);
  } 

  getPosts(tableSelected){
    this.selectedIndex=0;
    this.tableObj=tableSelected;
    this.selectedIndex=this.tableMap.indexOf(this.tableObj);
    console.log("selected",this.selectedIndex); 
    this.select(this.selectedIndex);
  
    }

    ngAfterViewInit() {
    
    }
}
