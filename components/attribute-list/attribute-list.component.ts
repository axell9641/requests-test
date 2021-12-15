import { Component, OnInit, Input } from '@angular/core';
import { Attribute } from '../../models/attribute.model';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent implements OnInit {
  @Input()
  attributes: Attribute[];
  constructor() { }


  ngOnInit() {
  }

}
