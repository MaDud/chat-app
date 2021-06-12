import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const MessageBox = ({userId, messageOwnerId, message, source}) => {

    if (userId === messageOwnerId) {
        return (
            <View style={[styles.box, styles.userBox]}>
                <Text style={[styles.message, styles.userMessage]}>{message}</Text>
            </View>
        ) 
    }

    return (
        <View style={styles.answerBox}>
            <Image source={{uri: source}} style={styles.userIcon}/>
            <View style={[styles.box, styles.answerMessage]}>
                <Text style={styles.message}>{message}</Text>
            </View>
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
    message: {
        fontSize: 14
    },
    userBox: {
        backgroundColor: "#993AFC",
        borderBottomLeftRadius: 12,
        marginRight: 24,
        display: "flex",
        alignSelf: "flex-end",
        marginBottom: 12,
    },
    userMessage: {
        color: '#fff'
    },
    answerBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        marginLeft: 16
    },
    answerMessage: {
        backgroundColor: "#fff",
        borderBottomRightRadius: 12,
        marginLeft: 12
    },
    userIcon: {
        width: 24,
        height: 24,
        borderRadius: 50
    }
});

export default MessageBox