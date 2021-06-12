import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { StyleSheet, View } from 'react-native';
import {useFonts, Poppins_400Regular} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import UsersRooms from './components/UsersRooms';
import ChatRoom from './components/ChatRoom';

const token1 = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MjQ1Mzg4NTQsImlhdCI6MTYyMjExOTY1NCwiaXNzIjoiY2hhdGx5IiwianRpIjoiZTBlODM3NDgtODkxZS00ZmQyLWFmNjUtYmE5MjlhYmUzOWUwIiwibmJmIjoxNjIyMTE5NjUzLCJzdWIiOiI0ODU2ODVmMS1mNGQxLTQzOWYtYWE3MC0zYjg1ZWI4NjZmZTkiLCJ0eXAiOiJhY2Nlc3MifQ.JQy40M5jYX0ZRuEeItXUsHrHwEyJHXzSXdGi1hV6HHax9FJB9D2FjqX3fBzteUkLApFtHOcGVwUADpFp-tbUfw"

const httpLink = createHttpLink( {
  uri: 'https://chat.thewidlarzgroup.com/api/graphql'
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token1}`,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export default function App() {

  const [fontLoaded] = useFonts({Poppins_400Regular});
  if (!fontLoaded) { 
    return <AppLoading /> 
  }

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <UsersRooms />
        {/* <ChatRoom /> */}
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    fontFamily: 'Poppins_400Regular'
  },
});
