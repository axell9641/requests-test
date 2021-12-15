import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-additional-data-item',
  templateUrl: './additional-data-item.component.html',
  styleUrls: ['./additional-data-item.component.scss'],
})
export class AdditionalDataItemComponent implements OnInit {
  @Input()
  item: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  sanitizeImg(value: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
