import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

const Room = ({name, source}) => {
     return (
         <View>
            <View >
                <Image source={
                    source ? {uri: source} : require('../assets/favicon.png')
                }/>
            </View>
            <View >
                 <Text>{name}</Text>
            </View>
         </View>
     )
};

export default Room