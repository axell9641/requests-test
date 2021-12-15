import { StatusRequest } from 'src/app/shared/constants/status-request';

export interface RequestResponse {
  id: string;
  didUser: string;
  procedure: string;
  createAt: string;
  state: StatusRequest;
  requirements: Requirements;
  schemaCredential: any;
}

export interface Requirements {
  credentials: Credential[];
  additionalsData?: any;
}

export interface Credential {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  expirationDate: string;
  credentialSubject: any;
  evidence: any;
  proof: any;
}
