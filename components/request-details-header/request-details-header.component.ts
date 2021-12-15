import { Component, Input } from '@angular/core';
import { RequestDetailsHeader } from './request-details-header.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-details-header',
  templateUrl: './request-details-header.component.html',
  styleUrls: ['./request-details-header.component.scss']
})
export class RequestDetailsHeaderComponent {

  @Input()
  request: RequestDetailsHeader;

  constructor( private router: Router) { }

  onClickClose() {
    this.router.navigate(['requests']);
  }

}
