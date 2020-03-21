import { Component, OnInit } from '@angular/core'
import PerfectScrollbar from 'perfect-scrollbar'
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
})

export class SidebarComponent implements OnInit {
  public menuItems: any[]
  people$;
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false
    }
    return true
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem)
     this.fetchData(); 
  }
  updatePS(): void  {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper')
      let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true })
    }
  }
  isMac(): boolean {
    let bool = false
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true
    }
    return bool
  }

   constructor(private webTableService: TableService) {} 

   fetchData = () => {
    this.people$ = this.webTableService.fetchData();
    console.log("output",this.people$);
  } 
   
  
}
