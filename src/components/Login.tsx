import React, { useState } from "react";

import useAuth from "hooks/useAuth";
import { magicIcon } from "config/magic";
import Spinner from "./Spinner";


export default function Login() {

  const userHandle = useAuth();

  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  console.log(email);
  const handleLogin = async () => {
    setLoading(true);
    await magicIcon.auth.loginWithMagicLink({ email });
    const magicUserDetails = await magicIcon.user.getMetadata();
    console.log(magicUserDetails);
    userHandle.setAuthDetails!({
      loggedIn: true,
      user: {
        walletAddress: magicUserDetails.publicAddress!,
      }
    });
    setLoading(false);
  }

  return (
    <div>
      <h4>LOGIN!!</h4>
      <form>
        <input
          placeholder='email'
          name='email'
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <button type='submit' disabled={loading} onClick={handleLogin} >Login</button>
        <Spinner show={loading} overlay={true} />
      </form>
    </div>
  );
}