import React from 'react';
import { Pressable, View, TextInput } from 'react-native';
import Header from './Header';
import {GET_CHAT_DATA} from '../index';
import {useQuery} from '@apollo/client'

const ChatRoom = () => {
    const {loading, data} = useQuery(GET_CHAT_DATA, {
        variables: {id: "93d14fbd-dfc7-410b-b063-052c89fdd24f"}
    });

    if (loading) {
        console.log('loading')
    } else {
        console.log(data)
    }

    return (
        <View>
            <Header>

            </Header>
            <View>

            </View>
            <View>
                <TextInput />
                <Pressable>

                </Pressable>
            </View>
        </View>
    )
};

export default ChatRoom