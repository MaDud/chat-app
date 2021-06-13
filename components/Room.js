import React from 'react';
import {StyleSheet, Pressable, Image, Text, View} from 'react-native';
import { Profile } from './Svgs';

const Room = ({name, source, openChat}) => {
     return (
         <Pressable style={styles.roomBox} onPress={openChat}>
            <View style={styles.imageBox}>
                {source ? <Image source={{uri: source}} style={styles.profileImg}/> : <Profile />
                }
            </View>
            <View >
                 <Text style={styles.roomName}>{name}</Text>
            </View>
         </Pressable>
     )
};

const styles = StyleSheet.create( {
    roomBox: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
        marginTop: 12,
    },
    roomName: {
        fontFamily: 'Poppins_400Regular',
    },
    profileImg: {
        height: 64,
        width: 64,
        borderRadius: 50
    },
    imageBox: {
        marginRight: 16
    }
})

export default Room