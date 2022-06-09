import Web3 from "web3";
import { ApiPromise } from "@polkadot/api";
import "@polkadot/api-augment";

import { NETWORKS } from "routes/constants";
import { substrateWsProvider } from "config/polkadot";
import { magicPolkadot } from "config/magic";


export const timeout = (instance: number) => {
  const seconds = instance === 1 ? 2000 : 1000;
  return new Promise((resolve) => setTimeout(resolve, seconds));
};

export async function getBalance(
  publicAddress: string,
  network: string,
  web3?: Web3
) {
  let balance = "0";
  if (network === NETWORKS.ethereum.name) {
    balance = (await web3?.eth.getBalance(publicAddress!)) ?? "0";
    console.log(balance);
  } else if (network === NETWORKS.polkadot.name) {
    const api = await ApiPromise.create({ provider: substrateWsProvider }); // create this beforehand in another place?
    console.log('api is connected');
    let {
      data: { free: walletBalance },
    } = await api.query.system.account(publicAddress);
    balance = walletBalance.toString() || "0"; // TODO: remove this check if necessary
    console.log(walletBalance);

  }
  return balance;
}

export async function sendNativeToken(
  sender: string,
  receiver: string,
  amount: number,
  network: string,
  web3?: Web3
) {
  if (network === NETWORKS.ethereum.name) {
    console.log("eth detected");
    console.log(web3!.eth);
    const res = web3?.eth.sendTransaction({
      from: sender,
      to: receiver,
      value: web3.utils.toBN(web3.utils.toWei(amount.toString())),
    });
    return res;
  } else if (network === NETWORKS.polkadot.name) {
    const res = await magicPolkadot.polkadot.sendTransaction(receiver, amount);
    return res;
  }
}


