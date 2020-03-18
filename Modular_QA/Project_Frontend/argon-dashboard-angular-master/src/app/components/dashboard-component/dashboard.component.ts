import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, Validators } from '@angular/forms';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  public oppoSuitsForm: any = this.fb.group({name: ['', [Validators.required]]});
  public oppoSuits: any = ['Customer', 'Department', 'Days', 'Employee'];
  submitted = false;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;
  isShowDivIf = true;
  tableShow: string;

  MoviesWatched = [
  ];


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }


  constructor(public fb: FormBuilder) { }




}
