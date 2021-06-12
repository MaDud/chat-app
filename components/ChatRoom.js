import React, {useState} from 'react';
import { StyleSheet, Pressable, View, TextInput, Image, Text } from 'react-native';
import {GET_CHAT_DATA} from '../index';
import {useQuery} from '@apollo/client';
import Header from './Header';

const ChatRoom = () => {
    const {loading, data} = useQuery(GET_CHAT_DATA, {
        variables: {id: "93d14fbd-dfc7-410b-b063-052c89fdd24f"}
    });
    const [text, setText] = useState('hej');

    if (loading) {
        return <Text>Loading...</Text>
    } 

    return (
        <View>
            <Header>
                <View style={styles.chatHeader}>
                    <Image source={require('../assets/favicon.png')} style={styles.chatIcon}/>
                    <View>
                        <Text>{data.room.name}</Text>
                        <Text></Text>
                    </View>
                </View>
            </Header>
            <View>

            </View>
            <View style={styles.newMessageBox}>
                <TextInput
                    style={styles.input}
                    defaultValue={text}
                    onChangeText={text => setText(text)}
                />
                <Pressable>
                    <Text>send</Text>
                </Pressable>
            </View>
        </View>
    )
};

const styles = StyleSheet.create( {
    chatHeader: {
        display: "flex",
        flexDirection: "row"
    },
    chatIcon: {
        width: 44,
        height: 44,
        borderRadius: 50
    },
    newMessageBox: {
        position: "fixed",
        bottom: 0,
        backgroundColor: "#B6DEFD",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingBottom: 15,
        width: '100%',
        height: 68,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    input: {
        backgroundColor: "#fff",
        flex: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        marginLeft: 16,
    }
})

export default ChatRoom