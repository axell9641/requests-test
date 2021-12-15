import { Component, OnInit, Input } from '@angular/core';
import { Credential } from 'src/app/requests/models/request.response.model';
import { forEach } from 'lodash';

@Component({
  selector: 'app-request-details-content',
  templateUrl: './request-details-content.component.html',
  styleUrls: ['./request-details-content.component.scss'],
})
export class RequestDetailsContentComponent implements OnInit {
  @Input()
  credentials: Credential[];
  @Input()
  request: string;
  @Input()
  aditionalData: any;

  additionalDataFormated: any[];

  constructor() {}

  ngOnInit() {
    this.additionalDataFormated = this.getAditionalDataFormated(
      this.aditionalData
    );
  }

  getAditionalDataFormated(additionalData: any) {
    const aditionalDataFormated = [];
    forEach(this.aditionalData, (value, key) => {
      const valueClaim = this.handleAttributeContent(key, value);
      const item = { value: valueClaim, key };
      aditionalDataFormated.push(item);
    });

    return aditionalDataFormated;
  }

  // TODO: refactor
  handleAttributeContent(key: string, attribute: string | any[] | any) {
    const typeOfAttribute = typeof attribute;
    if (key === 'name') {
      if (typeOfAttribute === 'string') {
        return attribute;
      } else if (typeOfAttribute === 'object') {
        return attribute['givenName'] + ' ' + attribute['familyName'];
      } else {
        return attribute;
      }
    }

    if (key === 'images') {
    }

    return attribute;
  }
}
