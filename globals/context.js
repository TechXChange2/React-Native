import React from 'react';
import * as API from '../navScreens/API';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import { signOut } from "firebase/auth";


const Context = React.createContext();

const ContextProvider = ({children}) => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userData, setUserData] = React.useState({});
  const [userToken, setUserToken] = React.useState('null');
  const [isLoading, setIsLoading] = React.useState(false);

  //Google API key: AIzaSyBjVph8imz-Y9y90SWJJG8SrWDviEMgl7w

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('AUTH STATE changed with user:', user);
      if(user) {
        console.log('loggin in...')
        setUserEmail(user.email);
        getSetUserData(user.email);
      } else {
        console.log('logging out...')
        setUserEmail('');
        setUserData({});
      }
    })
    return () => {unsubscribe()}
  }, [])

  const getSetUserData = (email) => {
    API.getUserFromEmail(email)
    .then(res => {
      // console.log('context user res\n', res.data);
      setUserData(res.data[0]);
    })
    .catch(err => {
      console.log('error in getSetUserData', err);
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      // console.log('Success Reg (for json): ', JSON.stringify(userCredentials));
      console.log('Success Sign Out');
    })
    .catch(err => {
      console.log('Error sign out', JSON.stringify(err));
    })
  }

  return (
    <Context.Provider value={{
      userEmail,
      userData,
      handleSignOut
      }}>
      {children}
    </Context.Provider>
  )
};

export {ContextProvider, Context};