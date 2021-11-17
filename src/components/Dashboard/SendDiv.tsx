import React, { useState } from "react";
import { NETWORKS } from "routes/constants";

import { INetworkState } from "interfaces/networks"

type ISendDiv = {
  networkState: INetworkState;
  handleSendToken: (sendAmt: number, recipient: string) => void;
  handleNetworkChange: (networkName: string) => void;
}

export default function SendDiv(props: ISendDiv) {

  const [sendAmt, setSendAmt] = useState('0');
  const [recipient, setRecipient] = useState('');

  const sendToken = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('sending now');
    props.handleSendToken(parseFloat(sendAmt), recipient);
  }

  return (
    <div className='card'>
      <h4>Send {props.networkState.token}</h4>
      <div className='card'>
        <h5>Select Network</h5>
        <select defaultValue={NETWORKS.ICON.name} onChange={(e) => props.handleNetworkChange(e.target.value)}>
          <option value={NETWORKS.ICON.name}>ICON</option>
          <option value={NETWORKS.ethereum.name}>Ethereum</option>
        </select>
      </div>
      <form onSubmit={sendToken}>
        <p>
          <label htmlFor='sendAmt'>Amount: ({props.networkState.token}) </label>
          <input type='number' name='sendAmt' value={sendAmt} onChange={(e) => setSendAmt(e.target.value)} />
        </p>
        <p>
          <label htmlFor='recipient'>Receiving address: </label>
          <input type='text' name='recipient' value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </p>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}