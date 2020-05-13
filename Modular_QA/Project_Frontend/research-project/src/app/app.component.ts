import { Component, AfterViewInit, ViewChild} from '@angular/core';
import { SpinnerService } from './layouts/services/spinner.service';



@Component({
  selector: 'app-root',
   templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent  {
constructor(public spinner:SpinnerService)
{

}

}
