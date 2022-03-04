import { createContext, useContext } from "react";

import { IAuth } from "../interfaces/users";

export const defaultAuthState = {
  loggedIn: false,
  user: {
    walletAddress: ''
  },
  setAuthDetails: null
};

export const StoreContext = createContext<IAuth>(defaultAuthState);

const useStore = (): IAuth => useContext(StoreContext);

export default useStore;