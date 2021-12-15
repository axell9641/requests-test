
import { StadisticResponse } from './stats.response.model';
import { StatusRequest } from 'src/app/shared/constants/status-request';
const icon = {
  TOTAL: { label: 'assignment', description: 'stats.total' },
  APPROVED: { label: 'thumb_up', description: 'stats.approved' },
  CREATED: { label: 'thumbs_up_down', description: 'stats.pending' },
  DELETED: { label: 'thumb_down', description: 'stats.denegated' },
  SUCCESS: { label: 'thumb_up', description: 'stats.success' },
  DEFAULT: { label: 'assignment', description: 'default' }
};

export class ItemStatsViewer {
  icon: string;
  description: string;
  quantity: number;
  state: StatusRequest;
  constructor(itemResponse: StadisticResponse) {
    this.icon = icon[itemResponse.state].label;
    this.description = icon[itemResponse.state].description;
    this.quantity = itemResponse.total;
    this.state = itemResponse.state;
  }
}
