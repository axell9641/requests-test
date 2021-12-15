import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestDetailsActionsService } from './request-details-actions.service';
import * as moment from 'moment';

@Component({
  selector: 'app-request-details-actions',
  templateUrl: './request-details-actions.component.html',
  styleUrls: ['./request-details-actions.component.scss'],
  providers: [RequestDetailsActionsService],
})
export class RequestDetailsActionsComponent implements OnInit {
  requestForm: FormGroup;
  credentialForm: FormGroup;

  @Input() loadingApprove: boolean;
  @Input() loadingDenegated: boolean;
  @Input() schemaCredential: any = {};
  @Output()
  completeForm = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private service: RequestDetailsActionsService
  ) {}

  ngOnInit() {
    this.credentialForm = this.service.getCredential(this.schemaCredential);
    const { issuer } = this.schemaCredential;
    const type = this.schemaCredential['@type'];
    let issuanceDate = Date.now();
    if (type === 'AttendanceCredential') {
      issuanceDate = this.schemaCredential?.attendeeAt?.hasCourseInstance
        ?.startDate;
    }
    this.requestForm = this.fb.group({
      template: this.credentialForm,
      reason: [''],
      issuanceDate: [moment(issuanceDate), Validators.required],
      expirationDate: ['', Validators.required],
      operation: '',
      notExpire: false,
      issuer: [issuer || '', [Validators.required]],
    });
  }

  get credential() {
    return this.requestForm.get('template') as FormGroup;
  }

  formInitialized(name: string, form: FormGroup) {
    this.requestForm.patchValue({
      [name]: form,
    });
  }

  onToggleNotExpire(event) {
    if (event.checked) {
      return this.requestForm.get('expirationDate').disable();
    }
    return this.requestForm.get('expirationDate').enable();
  }

  onClickButton(operation: OPERATION) {
    this.requestForm.patchValue({
      operation,
    });
    const valueTemplate = this.credential.getRawValue();
    delete valueTemplate['issuer'];
    delete valueTemplate['@type'];
    const template = [JSON.stringify(valueTemplate)];
    const formValue = this.requestForm.getRawValue();
    if (this.requestForm.get('expirationDate').disabled) {
      formValue.expirationDate = moment('3000-01-01');
      formValue.expirationDate.format();
    }
    formValue.template = template;
    this.completeForm.emit(formValue);
  }
}

export type OPERATION = 'ACCEPTED' | 'DENEGATED';
