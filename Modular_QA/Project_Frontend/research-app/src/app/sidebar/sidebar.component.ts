import { Component, OnInit } from '@angular/core'
import { TableService } from '../services/table.service'  

declare const $: any

//Metadata
export interface RouteInfo {
  path: string
  title: string
  type: string
  icontype: string
  collapse?: string
  children?: ChildrenItems[]
}

export interface ChildrenItems {
  path: string
  title: string
  ab: string
  type?: string
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
  },
  {
    path: '',
    title: 'Home',
    type: 'link',
    icontype: 'dashboard' 
  }
]
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
          console.log("results", this.Tables$[0].columns);
          
        }
      }
      
      );
      
      
  }

 
}
