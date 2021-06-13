import React, {useState, useRef} from 'react';
import { StyleSheet, Pressable, View, TextInput, Image, Text, ScrollView} from 'react-native';
import {GET_CHAT_DATA, ADD_MESSAGE} from '../index';
import {useQuery, useMutation} from '@apollo/client';
import Header from './Header';
import MessageBox from './MessageBox';
import { Phone, Videocall, Send, Profile} from './Svgs';
import Button from './Button';
import AppLoading from 'expo-app-loading';

const ChatRoom = ({route}) => {
    const { roomId } = route.params;
    const scrollViewRef = useRef();
    const {loading, data} = useQuery(GET_CHAT_DATA, {
        variables: {id: roomId}
    });
    const [text, setText] = useState('');
    const [addMessage] = useMutation(ADD_MESSAGE, {
        refetchQueries: [ {query: GET_CHAT_DATA, variables: {id: roomId}}]
    })

    if (loading) {
        return <AppLoading />
    } 

    const conversation = data.room.messages.slice()
        .sort( (a,b) =>  { return a.insertedAt > b.insertedAt ? 1: -1})
        .map( (message, id) => {
            return (
                <MessageBox key={message.id} 
                    message={message.body} 
                    userId={data.room.user.id} 
                    messageOwnerId={message.user.id}
                    source={data.room.messages.length === id + 1 ? message.user.profilePic : null}/>
            )
    })

    const chatPic = data.room.messages.find( message => {
        return message.user.id !== data.room.user.id
    });

    const sendMessage = () => {
        addMessage( { variables: { roomId: roomId, body: text}});
        setText('');
    }

    return (
        <View>
            <Header>
                <View style={styles.chatHeader}>
                    <View>
                        {
                            chatPic.user.profilePic ? 
                            <Image source={{uri: `${chatPic.user.profilePic}`}} style={styles.chatIcon}/>
                            : <Profile />
                        }
                    </View>
                    <View style={styles.chatInfo}>
                        <Text style={styles.chatTitle}>{data.room.name}</Text>
                        <Text></Text>
                    </View>
                </View>
                <View style={styles.buttonBox}>
                    <Button title='phone'>
                        <Phone />
                    </Button>
                    <Button title='videocall'>
                        <Videocall />
                    </Button>
                </View>
            </Header>
            <View style={styles.chatBox}>
                <ScrollView ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                    {conversation}
                </ScrollView>
            </View>
            <View style={styles.newMessageBox}>
                <TextInput
                    style={styles.input}
                    defaultValue={text}
                    onChangeText={text => setText(text)}
                />
                <Pressable onPressIn={()=> sendMessage()} style={styles.send}>
                    <Send />
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
    chatHeader: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    chatInfo: {
        marginRight: 8,
        marginLeft: 8,
        flex: 1,
        alignSelf: 'flex-start'
    },
    chatTitle: {
        color: '#5603AD',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular'
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
        paddingLeft: 12,
        fontSize: 14,
        fontFamily: 'Poppins_400Regular'
    },
    chatBox: {
        height: "100%",
        paddingBottom: 80,
        paddingTop: 137,
        flexDirection: 'row',
        alignItems: "flex-end"
    },
    buttonBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    send: {
        marginRight: 16,
        marginLeft: 17
    }
})

export default ChatRoom