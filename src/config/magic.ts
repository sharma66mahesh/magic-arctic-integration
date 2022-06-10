import { Magic } from "magic-sdk";
import { PolkadotExtension } from "@magic-ext/polkadot";

export const magicEthereum = new Magic(
  process.env["REACT_APP_MAGIC_PERISHABLE_KEY"]!,
  {
    network: {
      rpcUrl: process.env["REACT_APP_EVM_RPC_URL"]!,
      chainId: 553,
    },
  }
);

export const magicPolkadot = new Magic(
  process.env["REACT_APP_MAGIC_PERISHABLE_KEY"]!,
  {
    extensions: [
      new PolkadotExtension({
        rpcUrl: process.env["REACT_APP_SUBSTRATE_RPC_URL"]!,
      }),
    ],
  }
);
