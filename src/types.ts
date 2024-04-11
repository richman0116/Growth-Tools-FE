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
  }
  accessToken: string;
  refreshToken: string;
};

type SubscriptionResponse = {
  url: string;
}
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
  logo?: File;
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
