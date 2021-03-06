import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from './Header';
import Room from './Room';
import {GET_USERS_ROOMS} from '../index';
import {useQuery} from '@apollo/client';
import Button from './Button';
import { Search, Rooms } from './Svgs';
import AppLoading from 'expo-app-loading';

const UsersRooms = ({navigation}) => {

    const { loading, data } = useQuery(GET_USERS_ROOMS);

    let innerContent;
    if (loading) {
        innerContent = <AppLoading />
    }
    else {
        const rooms = data.usersRooms.rooms;
        innerContent = (
            <View style={styles.usersRooms}>
                {rooms.map(room => {
                    return <Room key={room.id} 
                        name={room.name} 
                        source={room.roomPic} 
                        openChat={() => navigation.navigate('ChatRoom', {roomId: room.id})}/>
                })}
            </View>
        )
    }

    return (
        <View>
            <Header>
                <Text style={styles.title}>Rooms</Text>
                <View style={styles.buttonBox}>
                    <Button title='search'>
                        <Search />
                    </Button>
                    <Button title='rooms'>
                        <Rooms />
                    </Button>
                </View>
            </Header>
            {innerContent}
        </View>
    )

};

const styles = StyleSheet.create( {
    usersRooms: {
        marginTop: 137
    },
    buttonBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        color: "#5603AD",
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'Poppins_400Regular'
    }
})

export default UsersRooms