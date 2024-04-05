type User = {
  _id?: string;
  displayName: string;
  email: string;
  photoURL?: string;
};

type Room = {
  _id: string;
  name: string;
  userIds: User[];
  createdBy: string;
  admin: string;
  count: number;
  createdAt?: Date;
};

type CreateRoomType = {
  name: string;
  userIds: string[];
  createdBy: string;
  admin: string;
};

type UpdatedRoom = {
  roomId: string;
  count: number;
};

type Message = {
  roomId: string;
  content: string;
  senderId: string;
  recipientIds: string[];
  createdAt?: Date;
};

type MessageReceiver = {
  roomId: string;
  content: string;
  senderId: User;
  recipientIds: User[];
  createdAt?: Date;
};

type MessageRecipient = {
  messageId: string;
  recipientId: string;
  isRead: boolean;
  createdAt?: Date;
};

type ReadMessageData = {
  roomId: string;
  userId: string;
};

type Filters = {
  filter: {
    deals: boolean;
    trends: boolean;
  };
  categories: {
    analytics: boolean;
    design: boolean;
    productivity: boolean;
    emailMarketing: boolean;
    customerSupport: boolean;
    fileManagement: boolean;
    content: boolean;
    seo: boolean;
    socialMedia: boolean;
  };
  sortBy: "rating" | "az" | "za";
};

type Deal = {
  id: string;
  title: string;
  price: string;
  salePrice: string;
  url?: string;
};

type SubmitToolForm = {
  name: string;
  shortDescription: string;
  description: string;
  website: string;
  logo?: string;
  deal: Deal[];
  features: {
    value: string;
  }[];
  useCases: {
    value: string;
  }[];
  price: string;
  free: boolean;
  category: string;
};
