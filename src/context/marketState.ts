import { atom } from "recoil";

export const marketState = atom<{
  Cosmos: any;
  Stride: any;
  Neutron: any;
}>({
  key: "marketState",
  default: {
    Cosmos: {},
    Stride: {},
    Neutron: {},
  },
  dangerouslyAllowMutability: true,
});
