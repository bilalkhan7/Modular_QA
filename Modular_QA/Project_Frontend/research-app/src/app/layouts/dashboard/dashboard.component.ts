// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from '@angular/core'

declare interface DataTable {
  headerRow: string[]
  footerRow: string[]
  dataRows: string[][]
}

declare const $: any

@Component({
  selector: 'app-data-table-cmp',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit, AfterViewInit {
  public dataTable: DataTable
  ranks = [
    {value: 'waiter', viewValue: 'Waiter'},
    {value: 'receptioner', viewValue: 'Receptioner'},
  ]

  ngOnInit() {
    this.dataTable = {
      headerRow: [ 'Name', 'Position', 'Color', 'Phone Number', 'Unlock Code', 'Verified?', 'Date', 'Actions' ],
      footerRow: [ 'Name', 'Position', 'Color', 'Phone Number', 'Unlock Code', 'Verified?', 'Date', 'Actions' ],

      dataRows: [
        ['Airi Satou', 'Andrew Mike', 'red', '239482938', '2343', 'Yes', '2018/05/23', ''],
        ['Airi Satou', 'Andrew Mike', 'purple', '239482938', '2343', 'Yes', '2018/05/23', ''],
        ['Airi Satou', 'Andrew Mike', 'green', '239482938', '2343', 'Yes', '2018/05/23', ''],
        ['Airi Satou', 'Andrew Mike', 'blue', '239482938', '2343', 'Yes', '2018/05/23', ''],
        ['Airi Satou', 'Andrew Mike', 'red', '239482938', '2343', 'Yes', '2018/05/23', ''],
      ]
    }
    var mainPanel = document.getElementsByClassName('main-panel')[0]
    $('.modal').on('shown.bs.modal', function () {
      mainPanel.classList.add('no-scroll')
    })
    $('.modal').on('hidden.bs.modal', function () {
      mainPanel.classList.remove('no-scroll')
    })

  }

  ngAfterViewInit() {
    $('#datatables').DataTable({
      'pagingType': 'full_numbers',
      'bLengthChange': false,
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search records',
      }

    })

    const table = $('#datatables').DataTable()

    // Edit record
    table.on( 'click', '.edit', function () {
      const $tr = $(this).closest('tr')
      const data = table.row($tr).data()
      alert( 'You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.' )
    } )

    // Delete a record
    table.on( 'click', '.remove', function (e: any) {
      const $tr = $(this).closest('tr')
      table.row($tr).remove().draw()
      e.preventDefault()
    } )

    // Like record
    table.on( 'click', '.like', function () {
      alert('You clicked on Like button')
    })
  }
}
