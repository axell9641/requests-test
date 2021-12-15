import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
})
export class DynamicInputComponent implements OnInit {
  @Output() inputReady = new EventEmitter<FormControl>();
  dynamicInput: FormControl;
  @Input() public description: string;
  @Input() public claim: FormControl;
  @Input() public formGroup: FormGroup;
  @Input() public label: FormControlName;

  constructor() { }

  ngOnInit() {
    this.dynamicInput = this.claim;
    this.inputReady.emit(this.dynamicInput);
  }
}
