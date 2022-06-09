import React, { useState } from "react";

import useAuth from "hooks/useAuth";
import { magicEthereum } from "config/magic";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";


export default function Login() {

  const userHandle = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleLogin = async (e:any) => {
    e.preventDefault();

    setLoading(true);
    await magicEthereum.auth.loginWithMagicLink({ email }); 
    const magicUserDetails = await magicEthereum.user.getMetadata();
    console.log(magicUserDetails);
    userHandle.setAuthDetails!({
      loggedIn: true,
      user: {
        walletAddress: magicUserDetails.publicAddress!,
      }
    });
    setLoading(false);
    navigate('/');
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
        <button type='submit' disabled={loading} onClick={e => handleLogin(e)} >Login</button>
        <Spinner show={loading} overlay={true} />
      </form>
    </div>
  );
}