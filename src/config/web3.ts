import Web3 from 'web3';
import { magicEthereum } from './magic';
// @ts-ignore
export const ethWeb3 = new Web3(magicEthereum.rpcProvider);