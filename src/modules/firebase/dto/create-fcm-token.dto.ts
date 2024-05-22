import { EAppType } from './fcm-token.dto';

export type TCreateFcmTokenDto = {
  token: string;
  appType: EAppType;
};
