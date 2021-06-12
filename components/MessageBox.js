import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MessageBox = ({userId, message}) => {

    return (
        <View style={(styles.box, styles.userBox).join(' ')}>
            <Text>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create( {
    box: {
        width: 245,
        padding: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    userBox: {
        backgroundColor: "#993AFC",
        borderBottomLeftRadius: 12,
        marginRight: 24,
        color: "#fff"
    },
    answerBox: {
        backgroundColor: "#fff",
        borderBottomRightRadius: 12,
    }
})