import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrls: ['./left-container.component.scss']
})
export class LeftContainerComponent implements OnInit {

  public oppoSuitsForm: any = this.fb.group({name: ['', [Validators.required]]});
  public oppoSuits: any = ['Customer', 'Department', 'Days', 'Employee'];
  submitted = false;

  // Transfer Items Between Lists
   MoviesList = [
    'Name',
    'Last Name',
    'City',
    'Province',
    'Martial Status',
    'Age',
    'Education',

  ];


  constructor(public fb: FormBuilder) { }

  ngOnInit() {
  }

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

    /* Select Dropdown error handling */
    public handleError = (controlName: string, errorName: string) => {
      return this.oppoSuitsForm.controls[controlName].hasError(errorName);
    }

    onSubmit() {
      this.submitted = true;
      alert(JSON.stringify(this.oppoSuitsForm.value));
    }


}
