import React from 'react';
import * as API from '../navScreens/API';

const Context = React.createContext();

const ContextProvider = ({children}) => {
  const [userId, setUserId] = React.useState(undefined);
  const [userData, setUserData] = React.useState({});
  const [userToken, setUserToken] = React.useState('null');
  const [isLoading, setIsLoading] = React.useState(false);

  const login = () => {
    console.log('logging in...');
    setUserToken('abscnsdj');
    setIsLoading(false);
  };
  const logout = () => {
    console.log('logging out...');
    setUserToken('null');
    setIsLoading(false);
  };

  const getSetUserData = () => {
    console.log('getSetUserData CALLED..');
    const userIdTemp = !userId ? 2 : userId;
    API.getUserFromID(userIdTemp)
    .then(res => {
      // console.log('context user\n', response.data[0]);
      setUserData(res.data[0]);
    })
    .catch(err => {
      console.log('error in globals context', err);
    })
  }

  return (
    <Context.Provider value={{
      userToken,
      userData,
      setUserData,
      getSetUserData,
      login,
      logout
      }}>
      {children}
    </Context.Provider>
  )
};

export {ContextProvider, Context};