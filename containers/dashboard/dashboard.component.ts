import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GenericErrorComponent } from '../../../shared/components/generic-error/generic-error.component';
import { StatusRequest } from '../../../shared/constants/status-request';
import { AlertMessage } from '../../../shared/components/alert-message/alert.model';
import { ItemStatsViewer } from '../../models/item-stats.viewer.model';
import { StatsService } from '../../services/stats.service';
import { errors } from '../../constants/errors';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  colGrid = 4;
  stateRequest = StatusRequest.created;

  cards: ItemStatsViewer[];

  categoriesEmpty: AlertMessage;
  showCategoriesEmpty = false;

  constructor(private statsService: StatsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.showCategoriesEmpty = false;
    this.statsService.getStats().subscribe(
      (stats) => {
        this.handlerResponse(stats);
      },
      (error) => this.handlerError(error, this.getStats.bind(this))
    );
  }

  private handlerResponse(stats: ItemStatsViewer[]) {
    this.cards = stats;
    if (stats.length === 0) {
      this.categoriesEmpty = new AlertMessage(
        'completed-work',
        'medium',
        'stats.isEmpty'
      );
      this.showCategoriesEmpty = true;
    }
  }

  onClickStats(state: StatusRequest) {
    this.stateRequest = state;
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
