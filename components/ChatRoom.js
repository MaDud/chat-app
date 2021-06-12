import React, {useState} from 'react';
import { StyleSheet, Pressable, View, TextInput, Image, Text } from 'react-native';
import {GET_CHAT_DATA} from '../index';
import {useQuery} from '@apollo/client';
import Header from './Header';
import MessageBox from './MessageBox';

const ChatRoom = () => {
    const {loading, data} = useQuery(GET_CHAT_DATA, {
        variables: {id: "5a7a2352-c9e5-46ec-ba3c-f1e45be0f569"}
    });
    const [text, setText] = useState('hej');

    if (loading) {
        return <Text>Loading...</Text>
    } 

    console.log(data.room.messages)

    const conversation = data.room.messages.map( (message, id) => {
        return (
            <MessageBox key={message.id} 
                message={message.body} 
                userId={data.room.user.id} 
                messageOwnerId={message.user.id}
                source={data.room.messages.length === id + 1 ? message.user.profilePic : null}/>
        )
    })

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
            <View style={styles.chatBox}>
                {conversation}
            </View>
            <View style={styles.newMessageBox}>
                <TextInput
                    style={styles.input}
                    defaultValue={text}
                    onChangeText={text => setText(text)}
                />
                <Pressable onPressIn={()=> console.log(text)}>
                    <Text>send</Text>
                </Pressable>
            </View>
        </View>
    )
};

const styles = StyleSheet.create( {
    chatIcon: {
        width: 44,
        height: 44,
        borderRadius: 50
    },
    newMessageBox: {
        position: "absolute",
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
        padding: 12,
        fontSize: 14
    },
    chatBox: {
        display: "flex",
        height: "calc(100vh - 68px - 125px) ",
        justifyContent: "flex-end",
        marginTop: 137
    }
})

export default ChatRoom