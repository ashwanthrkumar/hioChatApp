import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();
    const loginUser = () => {
        setVisible(true);
        firestore()
            .collection('users')
            .where('email', '==', email)
            .get()
            .then(res => {
                setVisible(true);
                //console.log(JSON.stringify(res.docs));
                if (res.docs !== []) {
                    console.log(JSON.stringify(res.docs[0].data()));
                    goToNext(res.docs[0].data().name, res.docs[0].data().email, res.docs[0].data().userId)
                } else {
                    Alert.alert('User Not Found');
                }
            })
            .catch(error => {
                setVisible(false);
                console.log(error);
                Alert.alert('User Not Found');
            });
    };
    const goToNext = async (name, email, userId) => {
        await AsyncStorage.setItem('NAME', name);
        await AsyncStorage.setItem('EMAIL', email);
        await AsyncStorage.setItem('USERID', userId);
        navigation.navigate('Main');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                placeholder="Enter Email"
                style={[styles.input, { marginTop: 70 }]}
                value={email}
                onChangeText={txt => setEmail(txt)}
            />

            <TextInput
                placeholder="Enter Password"
                style={[styles.input, { marginTop: 20 }]}
                value={password}
                onChangeText={txt => setPassword(txt)}
            />

            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    loginUser();
                }}>
                <Text style={styles.btntext}>Login</Text>
            </TouchableOpacity>
            <Text
                style={styles.orlogin}
                onPress={() => {
                    navigation.navigate('Signup');
                }}>
                or Signup
            </Text>
        </View>
    );
};
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
        color: 'black',
        alignSelf: 'center',
        marginTop: 100,
        fontWeight: '600',
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 0.5,
        borderRadius: 10,

        alignSelf: 'center',
        paddingLeft: 20,
    },
    btn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: '#ac0000',
    },
    btntext: {
        fontWeight: '500',
        color: 'white',
        fontSize: 20,
    },
    orlogin: {
        alignSelf: 'center',
        marginTop: 50,
        fontSize: 20,
        fontWeight: '600',
        textDecorationLine: 'underline',
        color: '#7b7b7b',
    },
});
