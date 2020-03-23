import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core'
import { NavItem, NavItemType } from '../../md/md.module'
import { NavbarComponent } from '../../shared/navbar/navbar.component'
import PerfectScrollbar from 'perfect-scrollbar'

declare const $: any

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})

export class AdminLayoutComponent  {
    
    constructor() {
    }
    
}
