import React from 'react'
import{
    View,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity
}from 'react-native'
import {AntDesign, Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header({name, simbolo }){
    const navigation = useNavigation();
    return(
        <View style={styles.container} >
            <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'column'}}>
                <AntDesign name={simbolo} size={26} color="#000"/>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.username}>{name}</Text>
                <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser } >
                    <Feather name="coffee" size={27} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#8000ff',
        paddingTop: statusBarHeight,
        flexDirection: 'column',
        paddingStart: 10,
        paddingEnd: 16,
        paddingBottom: 44,
    },
    content:{
        flexDirection: 'row',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingStart: 16,
        paddingEnd: 16,
    },
    username:{
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonUser:{
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44/2,
    },
})