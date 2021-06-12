import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';

const Button = ({children, title}) => {

    return (
        <Pressable style={styles.iconBtn}>
            <Text style={styles.invisibleTitle}>{title}</Text>
            {children}
        </Pressable>
    )
};

const styles = StyleSheet.create( {
    iconBtn: {
        width: 44,
        height: 44,
        borderRadius: 50,
        backgroundColor: "#fff",
        marginRight: 8,
    },
    invisibleTitle: {
        display: "none"
    }
})

export default Button