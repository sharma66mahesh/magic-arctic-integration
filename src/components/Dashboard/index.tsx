import { useEffect, useState } from "react";

import useAuth from "hooks/useAuth";
import SendDiv from "./SendDiv";
import { magicEthereum, magicPolkadot } from "config/magic";
import { ethWeb3 } from "config/web3";
import { NETWORKS } from "routes/constants";
import { INetworkState } from "interfaces/networks";
import { getBalance, sendNativeToken } from "utils";
import Spinner from "components/Spinner";
import IconService from "icon-sdk-js";

const { IconAmount } = IconService;

const Dashboard = () => {
  const userHandle = useAuth();
  const [network, setNetwork] = useState<INetworkState>({
    magic: magicEthereum,
    web3: ethWeb3,
    name: NETWORKS.ethereum.name,
    token: NETWORKS.ethereum.token,
    tracker: process.env["REACT_APP_ETH_TRACKER"]!,
  });
  const [loading, setLoading] = useState<Boolean>(false);
  const [txHash, setTxHash] = useState("");
  const [userEthDetails, setUserEthDetails] = useState({
    address: "",
    balance: "0",
  });
  const [userPolkadotDetails, setUserPolkadotDetails] = useState({
    address: "",
    balance: "0",
  });

  useEffect(() => {
    async function fetchUser() {
      const { publicAddress: ethAddress } =
        await magicEthereum.user.getMetadata();
      const { publicAddress: polkadotAddress } =
        await magicPolkadot.user.getMetadata();

      const ethBalance = await getBalance(
        ethAddress!,
        NETWORKS.ethereum.name,
        ethWeb3
      );
      const polkadotBalance = await getBalance(
        polkadotAddress!,
        NETWORKS.polkadot.name
      );

      setUserEthDetails({ address: ethAddress!, balance: ethBalance });
      setUserPolkadotDetails({
        address: polkadotAddress!,
        balance: polkadotBalance,
      });
    }
    fetchUser();
  }, []);

  // TODO:
  useEffect(() => {
    setLoading(true);

    async function x() {
      const loggedIn = userHandle.loggedIn ? true : false;
      const { publicAddress } = await network.magic.user.getMetadata();
      console.log(publicAddress);
      userHandle.setAuthDetails!({
        loggedIn,
        user: {
          walletAddress: publicAddress,
        },
      });
      console.log(userPolkadotDetails);
      console.log(userEthDetails);

      if (network.name === NETWORKS.ethereum.name && userEthDetails.address) {
        const newEthBalance = await getBalance(
          userEthDetails.address,
          NETWORKS.ethereum.name,
          ethWeb3
        );
        setUserEthDetails({
          address: userEthDetails.address,
          balance: newEthBalance,
        });
      }

      if (
        network.name === NETWORKS.polkadot.name &&
        userPolkadotDetails.address
      ) {
        const newPolkadotBalance = await getBalance(
          userPolkadotDetails.address,
          NETWORKS.polkadot.name
        );
        setUserPolkadotDetails({
          address: userPolkadotDetails.address,
          balance: newPolkadotBalance,
        });
      }

      setLoading(false);
    }

    x();
  }, [network, txHash]);

  async function handleNetworkChange(networkName: string) {
    if (networkName === NETWORKS.ethereum.name) {
      setNetwork({
        magic: magicEthereum,
        web3: ethWeb3,
        name: NETWORKS.ethereum.name,
        token: NETWORKS.ethereum.token,
        tracker: process.env["REACT_APP_ETH_TRACKER"]!,
      });
    } else if (networkName === NETWORKS.polkadot.name) {
      setNetwork({
        magic: magicPolkadot,
        web3: undefined, // docs says this parameter is not required
        name: NETWORKS.polkadot.name,
        token: NETWORKS.polkadot.token,
        tracker: process.env["REACT_APP_POLKADOT_TRACKER"]!, // tracker is only used for providing link at the bottom of the page, not necessary for app functioning
      });
    }
  }

  const handleSendToken = async (sendAmt: number, recipient: string) => {
    setLoading(true);
    try {
      const res = await sendNativeToken(
        userHandle.user.walletAddress,
        recipient,
        sendAmt,
        network.name,
        network.web3
      );
      console.log(res);
      setTxHash(typeof res === 'object' ? res.transactionHash : (res ?? ''));
    } catch (err) {
      alert(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Spinner show={loading} overlay={true} />
      <div className="flex-row">
        <div className="card">
          <h5>EVM (Ethereum)</h5>
          <p>
            <b>Wallet Address: </b>
            {userEthDetails.address}
          </p>
          <p>
            <b>Balance: </b>
            {IconAmount.fromLoop(parseFloat(userEthDetails.balance), "ICX")} ETH
          </p>
          {/* TODO: using icon amount here? */}
        </div>
        <div className="card">
          <h5>Substrate (Polkadot)</h5>
          <p>
            <b>Wallet Address: </b>
            {userPolkadotDetails.address}
          </p>
          <p>
            <b>Balance: </b>
            {IconAmount.fromLoop(
              parseFloat(userPolkadotDetails.balance),
              "ICX"
            )}{" "}
            DOT
          </p>
        </div>
      </div>
      <SendDiv
        handleSendToken={handleSendToken}
        networkState={network}
        handleNetworkChange={handleNetworkChange}
      />
      {txHash && (
        <a
          href={`${network.tracker}/${txHash}`}
          rel="noreferrer noopener"
          target="_blank"
        >
          {txHash}
        </a>
      )}
    </div>
  );
};

export default Dashboard;
