import { Magic } from "magic-sdk";
import { PolkadotExtension } from "@magic-ext/polkadot";

export const magicEthereum = new Magic(
  process.env["REACT_APP_MAGIC_PERISHABLE_KEY"]!,
  {
    network: {
      rpcUrl: process.env["REACT_APP_ETHEREUM_EVM_RPC_URL"]!,
      chainId: 3, // TODO: what is chain ID here?
    },
  }
);

export const magicPolkadot = new Magic(
  process.env["REACT_APP_MAGIC_PERISHABLE_KEY"]!,
  {
    extensions: [
      new PolkadotExtension({
        rpcUrl: process.env["REACT_APP_POLKADOT_SUBSTRATE_RPC_URL"]!,
      }),
    ],
  }
);
