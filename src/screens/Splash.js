import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            checlLogin();
        }, 2000);
    }, []);
    const checlLogin = async () => {
        const id = await AsyncStorage.getItem("USERID");
        if (id !== null) {
            navigation.navigate('Main');
        }
        else {
            navigation.navigate('Login');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>{'Hion \n Chat App'}</Text>
        </View>
    );
};

export default Splash;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ac0000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
});
