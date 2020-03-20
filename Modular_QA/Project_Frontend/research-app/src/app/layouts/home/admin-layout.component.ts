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

export class AdminLayoutComponent implements OnInit, AfterViewInit {
    public navItems: NavItem[]

    @ViewChild('sidebar') sidebar: any
    @ViewChild(NavbarComponent) navbar: NavbarComponent
    constructor() {
    }
    ngOnInit() {
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel')
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper')
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel)
            ps = new PerfectScrollbar(elemSidebar)
        }
        this.navItems = [
          { type: NavItemType.NavbarLeft, title: 'Dashboard', iconClass: 'fa fa-dashboard' },

          {
            type: NavItemType.NavbarRight,
            title: '',
            iconClass: 'fa fa-bell-o',
            numNotifications: 5,
            dropdownItems: [
              { title: 'Notification 1' },
              { title: 'Notification 2' },
              { title: 'Notification 3' },
              { title: 'Notification 4' },
              { title: 'Another Notification' }
            ]
          },
          {
            type: NavItemType.NavbarRight,
            title: '',
            iconClass: 'fa fa-list',

            dropdownItems: [
              { iconClass: 'pe-7s-mail', title: 'Messages' },
              { iconClass: 'pe-7s-help1', title: 'Help Center' },
              { iconClass: 'pe-7s-tools', title: 'Settings' },
               'separator',
              { iconClass: 'pe-7s-lock', title: 'Lock Screen' },
              { iconClass: 'pe-7s-close-circle', title: 'Log Out' }
            ]
          },
          { type: NavItemType.NavbarLeft, title: 'Search', iconClass: 'fa fa-search' },

          { type: NavItemType.NavbarLeft, title: 'Account' },
          {
            type: NavItemType.NavbarLeft,
            title: 'Dropdown',
            dropdownItems: [
              { title: 'Action' },
              { title: 'Another action' },
              { title: 'Something' },
              { title: 'Another action' },
              { title: 'Something' },
              'separator',
              { title: 'Separated link' },
            ]
          },
          { type: NavItemType.NavbarLeft, title: 'Log out' }
        ]
    }
    ngAfterViewInit() {
        this.runOnRouteChange()
    }
    runOnRouteChange(): void {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper')
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel')
        let ps = new PerfectScrollbar(elemMainPanel)
        ps = new PerfectScrollbar(elemSidebar)
        ps.update()
      }
    }
    isMac(): boolean {
        let bool = false
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true
        }
        return bool
    }
}
