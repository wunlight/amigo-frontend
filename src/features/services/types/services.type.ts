export type Service = {
  id: string;
  name: string;
  default_price: number;
};

export type CreateServiceRequest = {
  name: string;
  default_price: number;
};