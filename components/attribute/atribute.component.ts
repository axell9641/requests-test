import { Component, Input } from '@angular/core';
import { Attribute } from '../../models/attribute.model';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent {

  @Input()
  attribute: Attribute;

  constructor() { }

}
