export type Community = {
  id: string;
  name: string;
  imgUrl: string;
  group: string;
};

export type Home = {
  id: string;
  communityId: string;
  price: number;
  area: number;
  type: string;
};

export type TransformedCommunity = Community & {
  avgPrice: number;
};
