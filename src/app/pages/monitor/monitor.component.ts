import { Component, OnInit } from '@angular/core';
import { TfNgNzPage } from '@3t-transform/tf-ng-nz';
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent extends TfNgNzPage implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
