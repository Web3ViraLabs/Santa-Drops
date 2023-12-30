export type Address = {
  address: `0x${string}`;
};

export type User = {
  name: string;
  id: string;
  image: string;
  createdAt?: Date;
};
