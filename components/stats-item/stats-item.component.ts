import { Component, OnInit, Input } from '@angular/core';
import { ItemStatsViewer } from '../../models/item-stats.viewer.model';

@Component({
  selector: 'app-stats-item',
  templateUrl: './stats-item.component.html',
  styleUrls: ['./stats-item.component.scss']
})
export class StatsItemComponent implements OnInit {

  @Input() item: ItemStatsViewer;

  constructor() { }

  ngOnInit() {
  }
}
