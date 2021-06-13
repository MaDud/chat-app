import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split
} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import { StyleSheet, View } from 'react-native';
import {useFonts, Poppins_400Regular} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import UsersRooms from './components/UsersRooms';
import ChatRoom from './components/ChatRoom';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const token1 = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MjQ1Mzg4NTQsImlhdCI6MTYyMjExOTY1NCwiaXNzIjoiY2hhdGx5IiwianRpIjoiZTBlODM3NDgtODkxZS00ZmQyLWFmNjUtYmE5MjlhYmUzOWUwIiwibmJmIjoxNjIyMTE5NjUzLCJzdWIiOiI0ODU2ODVmMS1mNGQxLTQzOWYtYWE3MC0zYjg1ZWI4NjZmZTkiLCJ0eXAiOiJhY2Nlc3MifQ.JQy40M5jYX0ZRuEeItXUsHrHwEyJHXzSXdGi1hV6HHax9FJB9D2FjqX3fBzteUkLApFtHOcGVwUADpFp-tbUfw"

const httpLink = createHttpLink( {
  uri: 'https://chat.thewidlarzgroup.com/api/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("token");
  return {
    headers: {
      ...headers,
      authorization: token? `Bearer ${token1}` : '',
    }
  }
});

const authedHttpLink = authLink.concat(httpLink);

const phoenixSocket = new PhoenixSocket("wss://chat.thewidlarzgroup.com/socket", {
  params: () => {
    if (Cookies.get("token")) {
      return { token: Cookies.get("token") };
    } else {
      return {token: token1};
    }
  }
});

const absintheSocket = AbsintheSocket.create(phoenixSocket);

const websocketLink = createAbsintheSocketLink(absintheSocket);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  websocketLink,
  authedHttpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

const Stack = createStackNavigator();

export default function App() {

  const [fontLoaded] = useFonts({Poppins_400Regular});
  if (!fontLoaded) { 
    return <AppLoading /> 
  }

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="UsersRooms">
            <Stack.Screen name="UsersRooms" component={UsersRooms} options={{headerShown: false}}/>
            <Stack.Screen name="ChatRoom" component={ChatRoom} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
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
