import Web3 from 'web3';

const web3Provider = new Web3.providers.HttpProvider(process.env['REACT_APP_EVM_RPC_URL']!);

export const ethWeb3 = new Web3(web3Provider);