import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import Messagecomp from '../components/Messagecomp';
import Message from '../components/Message';

const Cs = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = DeviceInfo.getUniqueId();
    const route = useRoute();
    const roomId =
        userId > route.params.id
            ? route.params.id + '-' + userId
            : userId + '-' + route.params.id;

    useEffect(() => {
        const unsubscribe = firestore().collection(roomId).onSnapshot(
            querySnapshot => {
                const messageData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    value: doc.data().message,
                    userId: doc.data().userId,
                }));
                setMessages(messageData.reverse());
                setLoading(false);
            },
            error => {
                console.error('Error fetching messages:', error);
                setLoading(false);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [roomId]);

    const sendMessageHandler = message => {
        if (message) {
            firestore()
                .collection(roomId)
                .doc(moment().format('YYYY-MM-DD-hh-mm-ss-sssss'))
                .set({
                    message: message,
                    userId: userId,
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });
        }
    };

    const renderMessageItem = ({ item }) => {
        const isOwner = userId === item.userId;
        return (
            <View style={styles.messageContainer}>
                <Message message={item.value} isOwner={isOwner} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                {loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <FlatList
                        data={messages}
                        renderItem={renderMessageItem}
                        inverted
                        keyExtractor={item => item.id}
                    />
                )}
            </View>
            <Messagecomp onPressSend={sendMessageHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 5,
    },
    messageContainer: {
        marginVertical: 2,
    },
    listContainer: {
        flex: 1,
        width: '100%',
    },
});

export default Cs;
