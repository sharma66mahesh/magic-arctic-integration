import React, { useState } from "react"

import { INetworkState } from "interfaces/networks"

type ISendDiv = {
  networkState: INetworkState;
  handleSendToken: (sendAmt: number, recipient: string) => void;
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