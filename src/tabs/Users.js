//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useScrollToTop } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';

// create a component
const Users = () => {

    const [users, setUsers] = useState('subscribe');
    useEffect(() => {
        const unsubscribe = firestore().collection('users').doc('user1').onSnapshot(data => {
            setUsers(JSON.stringify(data._data));
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (

        <View style={styles.container}>
            <Text>{users}</Text>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff8f8f',
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#ac0000',
        fontSize: 20,
        fontWeight: '600',
    },
    userItem: {
        width: Dimensions.get('window').width - 50,
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        height: 60,
        borderWidth: 0.5,
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: 'center',
    },
    userIcon: {
        width: 40,
        height: 40,
    },
    name: {
        marginLeft: 20,
        fontSize: 15,
    }

});

//make this component available to the app
export default Users;


/*//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useScrollToTop } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// create a component
const Users = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);
    const getUsers = async () => {
        let tempData = []
        const email = await AsyncStorage.getItem("EMAIL")
        firestore().collection("users").where("email", "!=", email).get().then(res => {
            if (res.docs != []) {
                res.docs.map(item => {
                    tempData.push(item.data());
                });
            }
            setUsers(tempData);
        });

    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>HION CHAT APP</Text>
            </View>
            <FlatList data={users} renderItem={({ item, index }) => {
                return (
                    <View style={styles.userItem}>
                        <Image source={require('../images/Leadership.png')} style={styles.userIcon} />
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                );
            }} />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff8f8f',
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#ac0000',
        fontSize: 20,
        fontWeight: '600',
    },
    userItem: {
        width: Dimensions.get('window').width - 50,
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        height: 60,
        borderWidth: 0.5,
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: 'center',
    },
    userIcon: {
        width: 40,
        height: 40,
    },
    name: {
        marginLeft: 20,
        fontSize: 15,
    }

});

//make this component available to the app
export default Users;
*/