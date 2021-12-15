import { Component, OnInit, Input } from '@angular/core';
import { AlertMessage } from './alert.model';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent {

  @Input() alertMessage: AlertMessage;

  constructor() {}

}
