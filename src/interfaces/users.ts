import React from "react";

export interface IUser {
  walletAddress: string;
}

export interface IAuthDetails {
  loggedIn: boolean;
  user: IUser;
}

export interface IAuth {
  loggedIn: boolean;
  user: IUser;
  setAuthDetails: React.Dispatch<IAuthDetails> | null;
}