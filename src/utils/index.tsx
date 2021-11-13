import Web3 from "web3";
import IconService from "icon-sdk-js";

import { NETWORKS } from "routes/constants";
import iconSdk from "config/icon";

const { IconBuilder, IconAmount, IconConverter } = IconService;

export async function getBalance(publicAddress: string, network: string, web3?: Web3) {
  let balance = '0';
  if(network === NETWORKS.ethereum.name) {
    balance = await web3?.eth.getBalance(publicAddress!) ?? '0';
    console.log(balance);
  } else if(network === NETWORKS.ICON.name) {
    const balanceInBN = await iconSdk.getBalance(publicAddress!).execute();
    balance = balanceInBN.toString();
  }

  return balance;
}

export async function sendNativeToken(sender: string, receiver: string, amount: number, 
    magic: any, network: string, web3?: Web3) {
  if(network === NETWORKS.ethereum.name) {
    console.log('eth detected');
    console.log(web3!.eth);
     const res = web3?.eth.sendTransaction({
      from: sender,
      to: receiver,
      value: web3.utils.toBN(web3.utils.toWei(amount.toString()))
    });
    return res;

  } else if(network === NETWORKS.ICON.name) {

    const txObj = new IconBuilder.IcxTransactionBuilder()
      .nid(process.env['REACT_APP_ICON_NID']!)
      .from(sender)
      .to(receiver)
      .value(IconConverter.toHex(IconAmount.of(amount, IconAmount.Unit.ICX).toLoop()))
      .version(IconConverter.toHex(3))
      .timestamp(IconConverter.toHex((new Date()).getTime() * 1000))
      .stepLimit(process.env['REACT_APP_ICON_STEP_LIMIT']!)
      .build();

    const res =  magic.icon.sendTransaction(txObj);
    return res;
  }
}