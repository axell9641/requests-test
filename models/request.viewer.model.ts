import { RequestResponse } from './request.response.model';
import { StatusRequest } from '../../shared/constants/status-request';

export class RequestViewer {
  id: string;
  subject: string;
  country: string;
  date: string;
  group: string;
  status: StatusRequest;

  constructor(procedure: RequestResponse) {
    this.id = procedure.id;
    this.subject = procedure.procedure;
    this.country = procedure.requirements.additionalsData.office;
    this.group = procedure.schemaCredential?.attendeeAt?.about;
    this.date = procedure.createAt;
    this.status = procedure.state;
  }
}
