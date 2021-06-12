import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from './Header';
import Room from './Room';
import {GET_USERS_ROOMS} from '../index';
import {useQuery} from '@apollo/client'

const UsersRooms = () => {

    const { loading, data } = useQuery(GET_USERS_ROOMS);

    let innerContent;
    if (loading) {
        innerContent = <Text>Loading...</Text>
    }
    else {
        const rooms = data.usersRooms.rooms;

        innerContent = (
            <View>
                {rooms.map(room => {
                    return <Room key={room.id} name={room.name} source={room.roomPic}/>
                })}
            </View>
        )
    }

    return (
        <View>
            <Header>
                <Text>Rooms</Text>
            </Header>
            {innerContent}
        </View>
    )

};

export default UsersRooms