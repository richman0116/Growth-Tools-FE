type User = {
  user: {
    id: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    dob: Date;
    citizenship: string;
    gender: string;
    type: string;
    permissions: string[];
  };
  accessToken: string;
  refreshToken: string;
};

type SubscriptionResponse = {
  url: string;
};
type Filters = {
  filter: {
    deals: boolean;
    trends: boolean;
  };
  categories: any;
  sortBy: string;
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
  logo?: File;
  screenshots?: {
    value: File;
  }[];
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
  subscription: string;
};

type Category = {
  id: string;
  name: string;
  description: string;
  handle: string;
  icon: string;
  order?: number;
};

type PaginationMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
type PaginationResponse<T> = {
  data: T[];
  pagination: PaginationMeta;
};

type Author = {
  id: string;
  email: string;
  avatar: string;
  phone: string;
  firstName: string;
  lastName: string;
};

type ToolDeal = {
  id: string;
  name: string;
  descriptions: string;
  discountPrice: string;
  price: string;
};

type ToolInfo = {
  id: string;
  name: string;
  shortDescription?: string;
  description?: string;
  website?: string;
  logo?: string;
  screenshots?: string[];
  keyFeatures?: string[];
  useCases?: string[];
  price: number;
  author: Author;
  toolDeals: ToolDeal[];
  category: Category;
};
