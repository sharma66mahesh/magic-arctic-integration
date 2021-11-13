import { useEffect, useState } from "react";

import useAuth from "hooks/useAuth";
import NetworkSelector from './NetworkSelector';
import SendDiv from './SendDiv';
import { magicIcon, magicEthereum } from "config/magic";
import { ethWeb3 } from "config/web3";
import { NETWORKS } from "routes/constants";
import { INetworkState } from "interfaces/networks";
import { getBalance, sendNativeToken } from "utils";
import Spinner from 'components/Spinner';

const Dashboard = () => {
  const userHandle = useAuth();
  const [network, setNetwork] = useState<INetworkState>({
    magic: magicIcon,
    web3: undefined,
    name: NETWORKS.ICON.name,
    token: NETWORKS.ICON.token,
    tracker: process.env['REACT_APP_ICON_TRACKER']!
  });
  const [balance, setBalance] = useState<string>('-');
  const [loading, setLoading] = useState<Boolean>(false);
  const [txHash, setTxHash] = useState('');
  
  useEffect(() => {
    setBalance('-');
    setLoading(true);
    async function x() {
      const loggedIn = userHandle.loggedIn ? true : false;
      const { publicAddress } = await network.magic.user.getMetadata()
      userHandle.setAuthDetails!({
        loggedIn,
        user: {
          walletAddress: publicAddress
        }
      });
      const newBalance = await getBalance(publicAddress, network.name, network.web3);
      setBalance(newBalance);
      setLoading(false);
    }
    x();
  }, [network, txHash]);

  async function handleNetworkChange(networkName: string) {
    if(networkName === NETWORKS.ICON.name) {
      setNetwork({ 
        magic: magicIcon,
        web3: undefined,
        name: NETWORKS.ICON.name,
        token: NETWORKS.ICON.token,
        tracker: process.env['REACT_APP_ICON_TRACKER']!
       });
    } else {
      setNetwork({ 
        magic: magicEthereum,
        web3: ethWeb3,
        name: NETWORKS.ethereum.name,
        token: NETWORKS.ethereum.token,
        tracker: process.env['REACT_APP_ETH_TRACKER']!
       });
    }
  }

  const handleSendToken = async (sendAmt: number, recipient: string) => {
    setLoading(true);
    try {
      const res = await sendNativeToken(userHandle.user.walletAddress, recipient, sendAmt, 
          network.magic, network.name, network.web3);
          console.log(res);
      const txHash = network.name === NETWORKS.ICON.name ? res : res.transactionHash;
      setTxHash(txHash);
    } catch (err) {
      alert(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return(
    <div>
      <Spinner show={loading} overlay={true} />
      <p className='card'><b>Wallet Address: </b>{userHandle.user.walletAddress}</p>
      <NetworkSelector balance={balance} networkState={network} handleNetworkChange={handleNetworkChange} />
      <SendDiv handleSendToken={handleSendToken} networkState={network} />
      {txHash && <a href={`${network.tracker}/${txHash}`} rel='noreferrer noopener' target='_blank'>{txHash}</a>}
    </div>
  );
}

export default Dashboard;