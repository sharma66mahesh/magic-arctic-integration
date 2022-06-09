import { WsProvider } from "@polkadot/api";

export const substrateWsProvider = new WsProvider(
  process.env["REACT_APP_SUBSTRATE_RPC_URL"]
);