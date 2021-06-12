import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import {Search} from './Svgs';


const Header = ({children}) => {
    return (
        <View style={styles.headerBgColor}>
            <View>
                {children}
            </View>
            <View style={styles.buttonsBox}>
               <Pressable style={styles.iconBtn}>
                    <Text>search</Text>
                    <Search />
               </Pressable>
               <Pressable style={styles.iconBtn}>
                    <Text>users</Text>
               </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBgColor: {
        backgroundColor: "#B6DEFD",
        paddingTop: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: "fixed",
        top: 0,
        height: 125,
        width: "100%"
    },
    buttonsBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconBtn: {
        // width: 44,
        padding: 10,
        borderRadius: 50,
        backgroundColor: "#fff"
    },
    icon: {
        width: 100
    }
})

export default Header;