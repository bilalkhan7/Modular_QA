import { Component, OnInit,AfterViewInit, OnDestroy, ViewChild } from '@angular/core'
import { TableService } from '../services/table.service'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { TablesMap } from '../interface/tables.map'
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [TableService]
})


export class SidebarComponent implements OnInit {
  public tableMap: TablesMap[];
  tableMap$;
  stateGroups: TablesMap[];


  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<TablesMap[]> = new ReplaySubject<TablesMap[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();



    constructor(private webTableService: TableService, private _formBuilder: FormBuilder) {

      this.Tables();

  }

  ngOnInit() {


     // set initial selection
     this.bankCtrl.setValue(this.tableMap[10]);

     // load the initial bank list
     this.filteredBanks.next(this.tableMap.slice());

     // listen for search field value changes
     this.bankFilterCtrl.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterBanks();
       });

  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: TablesMap, b: TablesMap) => a && b && a.table_name === b.table_name;
      });
  }

Tables() {
    this.webTableService.fetchData().subscribe(response => this.tableMap = response);

  }


  protected filterBanks() {
    if (!this.tableMap) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.tableMap.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.tableMap.filter(bank => bank.table_name.toLowerCase().indexOf(search) > -1)
    );
  }








}
