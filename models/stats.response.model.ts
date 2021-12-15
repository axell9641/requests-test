import { StatusRequest } from '../../shared/constants/status-request';


export interface StadisticResponse {
  state: StatusRequest;
  total: number;
}
