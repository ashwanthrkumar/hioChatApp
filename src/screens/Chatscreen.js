//import liraries
import React, { useState, useEffect, FlatList } from 'react';
import { View, StyleSheet } from 'react-native';
import Messagecomp from '../components/Messagecomp';
import firestore from '@react-native-firebase/firestore'
import Message from '../components/Message';
// create a component
const Chatscreen = () => {
    const [messages, setMessage] = useState([]);
    useEffect(() => {
        const unsubscribe = firestore().collection('MessageDirectory').onSnapshot(querySnapshot => {
            const messages = [];
            querySnapshot.forEach(dataSnapshot => {
                messages.push({
                    id: dataSnapshot.id,
                    value: dataSnapshot.data().message
                })
            });
            setMessage(messages);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const sendMessageHandler = message => {
        if (message) {
            firestore().collection('MessageDirectory').doc(new Date().toString()).set({ message: message, });
        }
    };


    const flatListItemRenderer = itemData => {
        return <View style={styles.messagecont}>
            <Message message={itemData.item.value} />
        </View>
    }
    return (
        <View style={styles.container}>
            <View style={styles.listcont}>
                <FlatList data={messages}
                    renderItem={flatListItemRenderer}
                    inverted={true} />

            </View>
            <Messagecomp onPressSend={sendMessageHandler} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 5,
    },
    messagecont: {
        marginVertical: 2,
    },
    listcont: {
        flex: 1,
        width: '100%',

    }
});

//make this component available to the app
export default Chatscreen;
