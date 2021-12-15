import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-details-additional-data',
  templateUrl: './request-details-additional-data.component.html',
  styleUrls: ['./request-details-additional-data.component.scss']
})
export class RequestDetailsAdditionalDataComponent implements OnInit {

  @Input()
  aditionalData: any;

  constructor() { }

  ngOnInit() {
  }

}
