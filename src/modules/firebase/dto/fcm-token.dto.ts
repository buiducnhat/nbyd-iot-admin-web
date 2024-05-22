export enum EAppType {
  NBYD_WEBAPP = 'NBYD_WEBAPP',
  NBYD_MOBILEAPP = 'NBYD_MOBILEAPP',
}

export type TFcmTokenDto = {
  userId: number;
  token: string;
  appType: EAppType;
  createdAt: string;
};
