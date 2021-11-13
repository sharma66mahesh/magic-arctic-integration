import { INetworkState } from "interfaces/networks"
import { NETWORKS } from "routes/constants";
import IconService from 'icon-sdk-js';

const { IconConverter } = IconService;

type INetworkSelectorProps = {
  networkState: INetworkState;
  balance: string;
  handleNetworkChange: (networkName: string) => void;
}

export default function NetworkSelector(props: INetworkSelectorProps) {

  return (
    <div className='card'>
      <h5>Select Network</h5>
      <div>
        <select defaultValue={NETWORKS.ICON.name} onChange={(e) => props.handleNetworkChange(e.target.value)}>
          <option value={NETWORKS.ICON.name}>ICON</option>
          <option value={NETWORKS.ethereum.name}>Ethereum</option>
        </select>
        <p>
          <b>Balance:</b>
          {`${IconConverter.toBigNumber(props.balance).div(10**18).toFixed(2)} ${props.networkState.token}`}
        </p>
      </div>
    </div>
  );
}