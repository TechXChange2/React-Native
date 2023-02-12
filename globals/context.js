import React from 'react';

const Context = React.createContext();

const ContextProvider = ({children}) => {
  const [userId, setUserId] = React.useState(1);
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

  return (
    <Context.Provider value={{
      userToken,
      userId,
      setUserId,
      login,
      logout
      }}>
      {children}
    </Context.Provider>
  )
};

export {ContextProvider, Context};