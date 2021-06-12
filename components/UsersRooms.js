import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from './Header';
import Room from './Room'

const UsersRooms = () => {

    return (
        <View>
            <Header>
                <Text>Rooms</Text>
            </Header>
            <View>
                <Room name='Test' source=""/>
            </View>
        </View>
    )

};

export default UsersRooms