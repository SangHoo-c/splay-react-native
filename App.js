import React, { useEffect } from 'react';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import SplashScreen from 'react-native-splash-screen';

import SplashComponent from './screens/SplashComponent';


const client = new ApolloClient({
  link: createHttpLink({uri: 'https://dev-api.storyplay.com/graphql'}),
  // uri: 'https://dev-api.storyplay.com/graphql',
  cache: new InMemoryCache()  
});


const App = () => {

  useEffect( () =>{
    SplashScreen.hide();
  }, []);

  return (
      <ApolloProvider client = {client}>
        <SplashComponent />
      </ApolloProvider>
  
  );
}


export default App;
