import { Magic } from "magic-sdk";
import { IconExtension } from "@magic-ext/icon";

export const magicIcon = new Magic(process.env['REACT_APP_MAGIC_PERISHABLE_KEY']!, {
  extensions: [
    new IconExtension({
      rpcUrl: process.env['REACT_APP_ICON_RPC_URL']!,
    })
  ]
});

export const magicEthereum = new Magic(process.env['REACT_APP_MAGIC_PERISHABLE_KEY']!, { network: { rpcUrl: process.env['REACT_APP_ROPSTEN_INFURA_NODE']!, chainId: 3 } });
