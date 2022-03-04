import { useEffect, useState } from "react";

import useAuth from "hooks/useAuth";
import SendDiv from './SendDiv';
import { magicIcon, magicEthereum } from "config/magic";
import { ethWeb3 } from "config/web3";
import { NETWORKS } from "routes/constants";
import { INetworkState } from "interfaces/networks";
import { getBalance, sendNativeToken, fetchIconTxDetails } from "utils";
import Spinner from 'components/Spinner';
import IconService from "icon-sdk-js";

const { IconAmount } = IconService;

const Dashboard = () => {
  const userHandle = useAuth();
  const [network, setNetwork] = useState<INetworkState>({
    magic: magicIcon,
    web3: undefined,
    name: NETWORKS.ICON.name,
    token: NETWORKS.ICON.token,
    tracker: process.env['REACT_APP_ICON_TRACKER']!
  });
  const [loading, setLoading] = useState<Boolean>(false);
  const [txHash, setTxHash] = useState('');
  const [userEthDetails, setUserEthDetails] = useState({ address: '', balance: '0' });
  const [userIconDetails, setUserIconDetails] = useState({ address: '', balance: '0'});

  useEffect(() => {
    async function fetchUser() {
      const { publicAddress: ethAddress } = await magicEthereum.user.getMetadata();
      const { publicAddress: iconAddress } = await magicIcon.user.getMetadata();
      const iconBalance = await getBalance(iconAddress!, NETWORKS.ICON.name);
      const ethBalance = await getBalance(ethAddress!, NETWORKS.ethereum.name, ethWeb3);

      setUserEthDetails({ address: ethAddress!, balance: ethBalance });
      setUserIconDetails({ address: iconAddress!, balance: iconBalance });
    }
    fetchUser();
  }, []);
  
  useEffect(() => {
    setLoading(true);
    async function x() {
      const loggedIn = userHandle.loggedIn ? true : false;
      const { publicAddress } = await network.magic.user.getMetadata();
      console.log(publicAddress);
      userHandle.setAuthDetails!({
        loggedIn,
        user: {
          walletAddress: publicAddress
        }
      });
      console.log(userIconDetails);
      console.log(userEthDetails)
      if(network.name === NETWORKS.ICON.name && userIconDetails.address) {
        if(txHash) await fetchIconTxDetails(txHash);
        const newIconBalance = await getBalance(userIconDetails.address, NETWORKS.ICON.name);
        console.log(newIconBalance)
        setUserIconDetails({ address: userIconDetails.address, balance: newIconBalance});
      }
      if(network.name === NETWORKS.ethereum.name && userEthDetails.address) {
        const newEthBalance = await getBalance(userEthDetails.address, NETWORKS.ethereum.name, ethWeb3);
        setUserEthDetails({ address: userEthDetails.address, balance: newEthBalance});
      }
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
      <div className='flex-row'>
        <div className='card'>
          <h5>Ethereum (Rinkeby)</h5>
          <p><b>Wallet Address: </b>{userEthDetails.address}</p>
          <p><b>Balance: </b>{IconAmount.fromLoop(parseFloat(userEthDetails.balance), 'ICX')} ETH</p>
        </div>
        <div className='card'>
          <h5>ICON (Berlin)</h5>
          <p><b>Wallet Address: </b>{userIconDetails.address}</p>
          <p><b>Balance: </b>{IconAmount.fromLoop(parseFloat(userIconDetails.balance), 'ICX')} ICX</p>
        </div>
      </div>
      <SendDiv handleSendToken={handleSendToken} networkState={network} handleNetworkChange={handleNetworkChange} />
      {txHash && <a href={`${network.tracker}/${txHash}`} rel='noreferrer noopener' target='_blank'>{txHash}</a>}
    </div>
  );
}

export default Dashboard;