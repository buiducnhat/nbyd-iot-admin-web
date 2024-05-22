import httpService from '@/shared/http-service';

import { TDashboardData } from './dashboard-data.model';

class DashboardService {
  getData() {
    return httpService.request<TDashboardData>({
      url: '/api/dashboard',
      method: 'GET',
    });
  }
}

export default new DashboardService();
