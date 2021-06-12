import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

const Room = ({name, source}) => {
     return (
         <View style={styles.roomBox}>
            <Image source={source ? {uri: source} : require('../assets/favicon.png')}
                style={styles.profileImg}
            />
            <View >
                 <Text>{name}</Text>
            </View>
         </View>
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
        marginTop: 20
    },
    profileImg: {
        height: 64,
        width: 64,
        marginRight: 16
    }
})

export default Room