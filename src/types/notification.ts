interface NotificationProps {
  id: number;
  userId: number;
  targetId: number;
  targetType: string;
  createdAt: string;
  updatedAt: string;
  friendship: {
    id: number;
    userId1: number;
    userId2: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    senderData: {
      id: number;
      firstname: string;
      lastname: string;
      profilImage: string;
      isAdmin: boolean;
    };
  };
}
export { NotificationProps };
