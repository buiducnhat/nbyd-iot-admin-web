export type TProject = {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  location?: number[];
  members: [
    {
      user: {
        id: string;
        firstName: string;
        lastName?: string;
        avatarImageFileUrl?: string;
      };
    },
  ];
  _count: {
    gateways: number;
  };
  description?: string;
  imageFileId?: string;
  imageFileUrl?: string;
  createdAt: string | Date;
};
