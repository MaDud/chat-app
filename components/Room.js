import React from 'react';
import {StyleSheet, Pressable, Image, Text, View} from 'react-native';

const Room = ({name, source, openChat}) => {
     return (
         <Pressable style={styles.roomBox} onPress={openChat}>
            <Image source={source ? {uri: source} : require('../assets/favicon.png')}
                style={styles.profileImg}
            />
            <View >
                 <Text>{name}</Text>
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
        marginTop: 12
    },
    profileImg: {
        height: 64,
        width: 64,
        marginRight: 16,
        borderRadius: 50
    }
})

export default Room