import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';

const Header = ({children}) => {

    // const svgBtn = svgs.map( svg => <Pressable style={styles.iconBtn}>{svg}</Pressable>);

    return (
        <View style={styles.headerBgColor}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    headerBgColor: {
        backgroundColor: "#B6DEFD",
        paddingTop: 65,
        paddingLeft: 16,
        paddingRight: 8,
        paddingBottom: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        position: "fixed",
        top: 0,
        height: 120,
        width: "100%"
    }
    // buttonsBox: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between'
    // },
    // iconBtn: {
    //     // width: 44,
    //     padding: 10,
    //     borderRadius: 50,
    //     backgroundColor: "#fff"
    // },
    // icon: {
    //     width: 100
    // }
})

export default Header;