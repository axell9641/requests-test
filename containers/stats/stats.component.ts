import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ItemStatsViewer } from '../../models/item-stats.viewer.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  @Input()
  cards: ItemStatsViewer[];

  @Output()
  cardClicked = new EventEmitter<string>();

  colGrid = 4;
  rowHeight = 125;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe(['(min-width: 320px) and (max-width: 600px)'])
      .subscribe(({ matches }) => {
        if (matches) {
          this.colGrid = 2;
          this.rowHeight = 85;
        }
      });

    this.breakpointObserver
      .observe(['(min-width: 601px) and (max-width: 960px)'])
      .subscribe(({ matches }) => {
        if (matches) {
          this.rowHeight = 125;
          return (this.colGrid = 2);
        }
      });

    this.breakpointObserver
      .observe(['(min-width: 961px)'])
      .subscribe(({ matches }) => {
        if (matches) {
          return (this.colGrid = 4);
        }
      });
  }

  ngOnInit() {
  }

  onClickStats(state: string) {
    this.cardClicked.emit(state);
  }

}
