import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from './Header';
import Room from './Room';
import {GET_USERS_ROOMS} from '../index';
import {useQuery} from '@apollo/client'

const UsersRooms = () => {

    const { loading, error, data } = useQuery(GET_USERS_ROOMS);

    if (loading) return <Text>Loading...</Text>;
    if (error) {console.log(error)}
    else {
        console.log(data)
    }
  
    return (
      <View >
        <Text>
          Hello
        </Text>
      </View>
    );

    // return (
    //     <View>
    //         <Header>
    //             <Text>Rooms</Text>
    //         </Header>
    //         <View>
    //             <Room name='Test' source=""/>
    //         </View>
    //     </View>
    // )

};

export default UsersRooms