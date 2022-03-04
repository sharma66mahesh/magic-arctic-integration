import Web3 from 'web3';
import { magicEthereum } from './magic';

export const ethWeb3 = new Web3(magicEthereum.rpcProvider);