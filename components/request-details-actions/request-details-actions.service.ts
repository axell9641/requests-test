import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable()
export class RequestDetailsActionsService {
  getCredential(inputCredential) {
    const credential = {};
    const credentialKeys = Object.keys(inputCredential);
    // TODO Refactor
    credentialKeys.forEach((itemCredential) => {
      if (
        inputCredential[itemCredential] === null ||
        typeof inputCredential[itemCredential] === 'string'
      ) {
        credential[itemCredential] = new FormControl({
          value: inputCredential[itemCredential],
          disabled: false,
        });
      } else if (typeof inputCredential[itemCredential] === 'object') {
        credential[itemCredential] = this.getCredential(
          inputCredential[itemCredential]
        );
      }
    });
    return new FormGroup(credential);
  }
}
