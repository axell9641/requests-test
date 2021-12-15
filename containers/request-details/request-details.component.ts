import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { GenericErrorComponent } from '../../../shared/components/generic-error/generic-error.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { RequestDetailsHeader } from '../../components/request-details-header/request-details-header.model';
import { errors } from '../../constants/errors';
import { RequestApprove } from '../../models/request.approve.model';
import { RequestResponse } from '../../models/request.response.model';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  loadingApprove = false;
  loadingDenegated = false;
  questionTextModal: string;
  textButtonModal: string;

  requestResponse: RequestResponse;
  requestDetailsHeader: RequestDetailsHeader;
  private reason: string;
  private payload = {
    id: null,
    payload: {},
  };

  schemaCredential: any;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private requestService: RequestService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.translate.get('modal.rejectRequest').subscribe((res: string) => {
      this.questionTextModal = res;
    });

    this.translate.get('button.reject').subscribe((res: string) => {
      this.textButtonModal = res;
    });

    this.route.data.subscribe((data: { procedureDetail: RequestResponse }) => {
      this.requestResponse = { ...data.procedureDetail };
      this.requestDetailsHeader = new RequestDetailsHeader(
        this.requestResponse.id,
        this.requestResponse.createAt
      );
      this.payload.id = this.requestResponse.id;
      this.schemaCredential = this.requestResponse.schemaCredential;
    });
  }

  get credentials() {
    return this.requestResponse.requirements.credentials;
  }

  onCompleteForm(dataForm) {
    if (dataForm.operation === 'DENEGATED') {
      this.reason = dataForm.reason;
      this.openDialog();
    } else {
      this.payload.payload = { ...this.prepareRequest(dataForm) };
      this.approveRequest();
    }
  }

  private approveRequest() {
    this.loadingApprove = true;
    this.requestService
      .approve(this.payload.id, this.payload.payload)
      .subscribe(
        (response) => {
          this.loadingApprove = false;
          this.toast.showToast('', 'requestAction.approved');
          this.goToUrl('/requests');
        },
        (error) => {
          this.loadingApprove = false;
          this.handlerError(error, this.approveRequest.bind(this));
        }
      );
  }

  // TODO: refactorizar
  private prepareRequest(dataForm): RequestApprove {
    // TODO: agregar algun tipo de validador para el json
    const { template, reason } = dataForm;
    const issuanceDate = dataForm.issuanceDate.format();
    const expirationDate = dataForm.expirationDate
      ? dataForm.expirationDate.format()
      : '0000-00-00T00:00:00-00:00';
    const requestApprove = new RequestApprove(
      { ...JSON.parse(template) },
      {},
      expirationDate,
      issuanceDate,
      reason,
      this.requestResponse.procedure
    );

    return requestApprove;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        questionTextModal: this.questionTextModal,
        textButtonModal: this.textButtonModal,
      },
    });
    dialogRef.afterClosed().subscribe((denegated) => {
      if (denegated) {
        this.denegateRequest();
      }
    });
  }

  denegateRequest() {
    this.loadingDenegated = true;
    this.requestService
      .denegate(this.requestResponse.id, this.reason)
      .subscribe(
        (response) => {
          this.loadingDenegated = false;
          this.toast.showToast('', 'requestAction.rejected');
          this.goToUrl('/requests');
        },
        (error) => {
          this.loadingDenegated = false;
          this.handlerError(error, this.denegateRequest.bind(this));
        }
      );
  }

  goToUrl(path: string) {
    this.router.navigate([path]);
  }

  private handlerError(error: HttpErrorResponse, callback: any) {
    const message = errors[error.status] || errors.default;
    this.dialogError(message)
      .afterClosed()
      .subscribe((retry) => {
        if (retry) {
          callback();
        }
      });
  }

  private dialogError(message: string): MatDialogRef<any> {
    const data = {
      data: { message },
    };
    return this.dialog.open(GenericErrorComponent, data);
  }
}
