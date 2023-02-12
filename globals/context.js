import React from 'react';

const Context = React.createContext();

const Provider = ({children}) => {
  const [user, setUser] = React.useState('Anon');

  return (
    <Context.Provider value={{user, setUser}}>
      {children}
    </Context.Provider>
  )
};

export {Provider, Context};