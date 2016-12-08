/* tslint:disable:no-unused-variable */
import { Component, OnInit } from '@angular/core';

import { Customer } from './model';

import { DataServiceP }  from './data-p.service';  // promise version
import { DataService }   from './data.service';    // observable version
import { LoggerService } from './logger.service';

@Component({
  moduleId: module.id,
  selector: 'customer-list',
  templateUrl: 'customer-list.component.html',
  styleUrls: ['customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
  customer: Customer;
  customers: Customer[];
  isBusy = false;

  // inject the DataService/DataServiceP and LoggerService
  constructor(
    private dataService: DataService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.isBusy = true;
    this.logger.log('Getting customers ...');
    this.dataService.getCustomers()
      // .then(custs => {   // promise version
      .subscribe(custs => { // observable version
        this.isBusy = false;
        this.customers = custs;
      });
  }

  shift(increment: number) {
    let ix = increment + this.customers.findIndex(c => c === this.customer);
    ix = Math.min(this.customers.length - 1, Math.max(0, ix));
    this.customer = this.customers[ix];
  }
}
