import React, {useState} from 'react';
import { StyleSheet, Pressable, View, TextInput, Image, Text, ScrollView} from 'react-native';
import {GET_CHAT_DATA, ADD_MESSAGE} from '../index';
import {useQuery, useMutation} from '@apollo/client';
import Header from './Header';
import MessageBox from './MessageBox';
import { Phone, Videocall, Send} from './Svgs';
import Button from './Button';

const ChatRoom = ({route}) => {
    const { roomId } = route.params;
    const {loading, data} = useQuery(GET_CHAT_DATA, {
        variables: {id: roomId}
    });
    const [text, setText] = useState('');
    const [addMessage] = useMutation(ADD_MESSAGE, {
        refetchQueries: [ {query: GET_CHAT_DATA, variables: {id: roomId}}]
    })

    if (loading) {
        return <Text>Loading...</Text>
    } 

    const conversation = data.room.messages.map( (message, id) => {
        return (
            <MessageBox key={message.id} 
                message={message.body} 
                userId={data.room.user.id} 
                messageOwnerId={message.user.id}
                source={data.room.messages.length === id + 1 ? message.user.profilePic : null}/>
        )
    })

    const sendMessage = () => {
        addMessage( { variables: { roomId: "93d14fbd-dfc7-410b-b063-052c89fdd24f", body: text}});
        setText('');
    }

    return (
        <View>
            <Header>
                <View style={styles.chatHeader}>
                    <Image source={{uri: `${data.room.roomPic}`}} style={styles.chatIcon}/>
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
                <ScrollView>
                    {conversation}
                </ScrollView>
            </View>
            <View style={styles.newMessageBox}>
                <TextInput
                    style={styles.input}
                    defaultValue={text}
                    onChangeText={text => setText(text)}
                />
                <Pressable onPressIn={()=> sendMessage()}>
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
        display: "flex",
        height: "100%",
        paddingBottom: 68,
        paddingTop: 137,
        justifyContent: "flex-end"
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