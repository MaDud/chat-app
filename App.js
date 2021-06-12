import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UsersRooms from './components/UsersRooms';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <UsersRooms />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
});
