import React from 'react';
import * as API from '../navScreens/API';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import { signOut } from "firebase/auth";


const Context = React.createContext();

const ContextProvider = ({children}) => {
  const [userData, setUserData] = React.useState({});
  const [userToken, setUserToken] = React.useState('null');
  const [bookmarksArr, setBookmarksArr] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReady, setIsReady] = React.useState({yourItems: false, bookmarks: false, trades: false});
  const [nav, setNav] = React.useState();

  //Button Colors: #007AFF

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log('AUTH STATE changed with user:', user);
      if(user) {
        console.log('loggin in...')
        setIsLoading(true);
        getSetUserData(user.email)
        .then(res => console.log('data...'))
        .catch(err => console.log('couldnt getSetUser...'))
      } else {
        console.log('logging out...')
        setUserData({});
      }
    })
    return () => {unsubscribe()}
  }, [])

  const updateNav = (nav) => {
    setTimeout(() => {
      setNav(nav)
    }, 100);
  }
  const getSetUserData = (email) => {
    return new Promise((resolve, reject) => {
      API.getUserFromEmail(email)
      .then(res => {
        // console.log('context user res\n', res.data);
        setUserData(res.data[0]);
          resolve('success')
      })
      .catch(err => {
        console.log('error in getSetUserData', err);
        reject('error')
      })
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
      userData,
      handleSignOut,
      isLoading,
      setIsLoading,
      isReady,
      setIsReady,
      nav,
      updateNav,
      bookmarksArr,
      setBookmarksArr
      }}>
      {children}
    </Context.Provider>
  )
};

export {ContextProvider, Context};