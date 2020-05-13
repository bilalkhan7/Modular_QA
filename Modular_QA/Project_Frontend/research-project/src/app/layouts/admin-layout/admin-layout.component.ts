import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/filter';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent  {
  @Input() searchResult=[];
  @Input() displayView='';
  public display=false;
  constructor(public spinnerService: SpinnerService)
    {
    
  }

  searchResponse(eventData:[])
  {
    
    if(eventData.length!==undefined && eventData.length>0)
    {
      console.log()
    this.display=true;
    this.searchResult=[];
    this.searchResult=eventData;
    console.log("search",this.searchResult);
    }
    else{
      this.display=false;
    }
  }

  clearView(eventData:string)
  {
    console.log('event',eventData)
    if(eventData!==undefined && eventData==='false')
    {
      this.display=false;
    }
  }


}
