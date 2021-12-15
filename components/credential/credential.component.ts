import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { Credential } from 'src/app/requests/models/request.response.model';
import { Attribute } from '../../models/attribute.model';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.scss']
})
export class CredentialComponent implements OnInit {

  @Input()
  credential: Credential;
  @Input()
  procedure: string;

  constructor() { }

  ngOnInit() {
  }

  getAttributes(credentialSubjetc: any): Attribute[] {
    const attributes: Attribute[] = [];
    _.forEach(credentialSubjetc, (value, key) => {
      if (key.startsWith('@')) {
        return;
      }
      const newValue = this.handleAttributeContent(key, value);
      attributes.push(new Attribute(key, newValue));
    });
    return attributes;
  }

  // TODO: refactor
  handleAttributeContent(key: string, attribute: string | any[] | any ) {
    const typeOfAttribute =  typeof(attribute);
    if (key === 'name') {
      if (typeOfAttribute === 'string') {
        return attribute;
      } else if (typeOfAttribute === 'object') {
        return attribute['givenName'] + ' ' + attribute['familyName'];
      } else {
        return attribute;
      }
    } else {
      return attribute;
    }
  }

}
