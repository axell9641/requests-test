import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { AlertMessage } from '../../../shared/components/alert-message/alert.model';
import { GenericErrorComponent } from '../../../shared/components/generic-error/generic-error.component';
import { StatusRequest } from '../../../shared/constants/status-request';
import { errors } from '../../constants/errors';
import { RequestViewer } from '../../models/request.viewer.model';
import { RequestService } from '../../services/request.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

const TAG_COLORS = {
  SUCCESS: '#27ae60',
  APPROVED: '#27ae60',
  REJECTED: '#eb5757',
  CREATED: '#f2c94c',
  DELETED: '#eb5757',
};
@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
  providers: [DatePipe],
})
export class RequestListComponent implements OnInit, OnChanges {
  @Input()
  stateRequest: StatusRequest;

  isFindingRequest = false;
  alertMessage: AlertMessage;
  showRequestEmpty = false;
  displayedColumns = ['subject', 'office', 'group', 'date', 'status'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  colors = TAG_COLORS;

  constructor(
    private requestService: RequestService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllRequest();
  }

  ngOnChanges(changes: SimpleChanges) {
    const filter = changes.stateRequest.currentValue;
    if (filter === StatusRequest.total) {
      this.getAllRequest();
    } else {
      this.getRequestsByStatus(filter);
    }
  }

  getAllRequest() {
    this.isFindingRequest = true;
    this.hideAlerts();
    this.requestService.findAll().subscribe(
      (response) => {
        this.handleResponse(response);
      },
      (error: HttpErrorResponse) => {
        this.handlerError(error, this.getAllRequest.bind(this));
      }
    );
  }

  getRequestsByStatus(statusRequest?: StatusRequest) {
    this.isFindingRequest = true;
    this.hideAlerts();
    this.requestService.findByStatus(statusRequest).subscribe(
      (response) => {
        this.handleResponse(response);
      },
      (error) => {
        this.handlerError(error, this.getRequestsByStatus.bind(this));
      }
    );
  }

  private handleResponse(response: RequestViewer[]) {
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isFindingRequest = false;
    if (response.length === 0) {
      this.alertMessage = new AlertMessage(
        'completed-work',
        'medium',
        'listRequest.withoutRequest'
      );
      this.showRequestEmpty = true;
    }
  }

  private hideAlerts() {
    this.showRequestEmpty = false;
  }

  // TODO: agregar el tipo funcion para el callback
  private handlerError(error: HttpErrorResponse, callback: any) {
    this.isFindingRequest = false;
    this.dataSource = new MatTableDataSource();
    const message = errors[error.status] || errors.default;
    this.openDialog(message)
      .afterClosed()
      .subscribe((retry) => {
        if (retry) {
          callback();
        }
      });
  }

  onClickRequest(row: RequestViewer) {
    this.router.navigate([`requests/${row.id}`]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(message: string): MatDialogRef<any> {
    const data = {
      data: { message },
    };
    return this.dialog.open(GenericErrorComponent, data);
  }

  getClassCountry(country: string = '') {
    return `flag-icon-${country.toLowerCase()}`;
  }
}
