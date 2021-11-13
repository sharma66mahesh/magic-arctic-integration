import { Magic } from "magic-sdk";
import Web3 from "web3";

export interface INetworkState {
  magic: Magic | any,
  web3: Web3 | undefined,
  name: string,
  token: string,
  tracker: string,
};