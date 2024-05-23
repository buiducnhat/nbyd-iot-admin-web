import qs from 'qs';

import httpService from '@/shared/http-service';
import { TPaginated } from '@/shared/types/paginated.type';

import { TGetListProjectDto } from './dto/get-list.dto';
import { TProject } from './project.model';

class ProjectService {
  getPaginated(input?: TGetListProjectDto) {
    return httpService.request<TPaginated<TProject>>({
      url: '/api/projects/admin/list',
      method: 'GET',
      params: input,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
  }

  delete(id: string) {
    return httpService.request({
      url: `/api/projects/admin/delete/${id}`,
      method: 'DELETE',
    });
  }

  deleteMany(ids: string[]) {
    return httpService.request({
      url: '/api/projects/admin/delete-many',
      method: 'DELETE',
      data: { ids },
    });
  }
}

export default new ProjectService();
