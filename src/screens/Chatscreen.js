//import liraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Messagecomp from '../components/Messagecomp';
import firestore from '@react-native-firebase/firestore'
import Message from '../components/Message';
import { FlatList } from 'react-native';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import { useRoute } from '@react-navigation/native';
// create a component
const Chatscreen = () => {
    const [messages, setMessage] = useState([]);
    const route = useRoute();
    const [loading, setLoading] = useState(true);
    const userId = DeviceInfo.getUniqueId();
    // const roomId = 'MessageDirectory';
    const roomId =
        route.params.id > route.params.data.userId
            ? route.params.data.userId + '-' + route.params.id
            : route.params.id + '-' + route.params.data.userId;
    useEffect(() => {
        const unsubscribe = firestore().collection(roomId).onSnapshot(querySnapshot => {
            const messages = [];
            querySnapshot.forEach(dataSnapshot => {
                messages.push({
                    id: dataSnapshot.id,
                    value: dataSnapshot.data().message,
                    userId: dataSnapshot.data().userId
                })
            })
            setMessage(messages.reverse());
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const sendMessageHandler = message => {
        if (message) {
            firestore().collection(roomId).doc(moment().format('YYYY-MM-DD-hh-mm-ss-sssss')).set({
                message: message,
                userId: userId,
            });
        }
    };


    const flatListItemRenderer = itemData => {
        const isOwner = userId === itemData.item.userId;
        return <View style={styles.messagecont}>
            <Message message={itemData.item.value} isOwner={isOwner} />
        </View>
    }
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }
    else {
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
    }
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

    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

//make this component available to the app
export default Chatscreen;

/*//import liraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Messagecomp from '../components/Messagecomp';
import firestore from '@react-native-firebase/firestore'
import Message from '../components/Message';
import { FlatList } from 'react-native';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
// create a component
const Chatscreen = () => {
    const [messages, setMessage] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const userId = DeviceInfo.getUniqueId();
    const roomId = 'MessageDirectory';
    useEffect(() => {
        const unsubscribe = firestore().collection(roomId).onSnapshot(querySnapshot => {
            const messages = [];
            querySnapshot.forEach(dataSnapshot => {
                messages.push({
                    id: dataSnapshot.id,
                    value: dataSnapshot.data().message,
                    userId: dataSnapshot.data().userId
                })
            })
            setMessage(messages.reverse());
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const sendMessageHandler = message => {
        if (message) {
            firestore().collection(roomId).doc(moment().format('YYYY-MM-DD-hh-mm-ss-sssss')).set({
                message: message,
                userId: userId,
            });
        }
    };


    const flatListItemRenderer = itemData => {
        const isOwner = userId === itemData.item.userId;
        return <View style={styles.messagecont}>
            <Message message={itemData.item.value} isOwner={isOwner} />
        </View>
    }
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }
    else {
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
    }
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

    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

//make this component available to the app
export default Chatscreen;
*/