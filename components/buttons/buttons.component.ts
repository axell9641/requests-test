import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  @Output() cancelAction = new EventEmitter<any>(); // TODO: cambiar el any por un tipo de dato
  @Output() createAction = new EventEmitter<any>(); // TODO: cambiar el any por un tipo de dato

  @Input() textButtonOk: string;
  @Input() textButtonCancel: string;
  @Input() isLoadingBtnCreate: boolean;
  @Input() isLoadingBtnCancel: boolean;
  @Input() isDisabled: boolean;
  @Input() cancelAlwaysEnabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.cancelAction.emit();
  }

  create() {
    this.createAction.emit();
  }

}
