import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/filter';
import { SpinnerService } from '../services/spinner.service';
import { ResponseData } from '../interface/Response';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent  {
  @Input() searchResult:ResponseData;
  @Input() displayView='';
  public display=false;
  constructor(public spinnerService: SpinnerService)
    {
    
  }

  searchResponse(eventData:ResponseData)
  {
    
    if(eventData!==null )
    {
      console.log()
    this.display=true;
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
