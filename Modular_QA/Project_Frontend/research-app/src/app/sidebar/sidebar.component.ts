import { Component, OnInit } from '@angular/core'
import { TableService } from '../services/table.service'  

declare const $: any


@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ TableService]
})

export class SidebarComponent implements OnInit {
  public Tables$;
  constructor(private webTableService: TableService) { 
}
  
  ngOnInit(){
    this.Tables$=this.webTableService.fetchData().subscribe(data => 
      {
        {
          this.Tables$=data;
          // console.log("results", this.Tables$[0].columns);
          
        }
      }
      
      );
      
      
  }

 
}
