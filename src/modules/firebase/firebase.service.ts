import httpService from '@/shared/http-service';

import { TCreateFcmTokenDto } from './dto/create-fcm-token.dto';
import { TDeleteFcmTokenDto } from './dto/delete-fcm-token.dto';
import { TFcmTokenDto } from './dto/fcm-token.dto';

class FirebaseService {
  createFcmToken(data: TCreateFcmTokenDto) {
    return httpService.request<TFcmTokenDto>({
      url: `/api/firebase/fcm/tokens`,
      method: 'POST',
      data,
    });
  }

  deleteFcmToken(data: TDeleteFcmTokenDto) {
    return httpService.request<void>({
      url: `/api/firebase/fcm/tokens`,
      method: 'DELETE',
      data,
    });
  }
}

export default new FirebaseService();
