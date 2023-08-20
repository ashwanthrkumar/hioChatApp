import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, TextInput, Button, TouchableOpacity } from 'react-native';
import Messagecomp from '../components/Messagecomp';
import firestore from '@react-native-firebase/firestore'
import Message from '../components/Message';
import { FlatList } from 'react-native';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import { useRoute } from '@react-navigation/native';
import ReplyDialog from '../components/ReplyDialog'; // Import your reply dialog component
import { Center } from 'native-base';

// create a component
const Chatscreen = () => {
    const [isReplying, setIsReplying] = useState(false); // State to track whether a reply dialog is open
    const [replyMessage, setReplyMessage] = useState(''); // State to store the message being replied to


    const textInputRef = useRef(null);
    const ref = null;












    const [messages, setMessage] = useState([]);
    const route = useRoute();
    const [loading, setLoading] = useState(true);
    const userId1 = DeviceInfo.getDeviceId();
    const [inputText, setInputText] = useState('');
    const [referencedText, setReferencedText] = useState('');
    const handleSend = () => {
        // Handle sending the message
        // Clear the input field
        setInputText(''); setIsReplying(false);
    };
    const handleReply = (message) => {
        setReferencedText(message);
        setIsReplying(true);


    };
    //console.log(userId1)
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
                    userId: dataSnapshot.data().userId,
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
                userId: userId1,
                //if(referencedText) { referencedText: referencedText },
                //referencedText: referencedText,

            });
        }
        // setReferencedText('');
    };


    const flatListItemRenderer = itemData => {
        //const isOwner = userId1 === itemData.item.userId;
        const handleSwipeToReply = () => {
            // Call the handleReply function with the message when a swipe-to-reply gesture is detected
            handleReply(itemData.item.value);
        };
        //console.log(itemData.item.userId)
        // console.log(userId1)
        const a1 = JSON.stringify(itemData.item.userId)
        const a2 = JSON.stringify(userId1)
        //console.log(a1)
        //console.log(a2)
        const subs1 = a1.substring(7, 23)
        //console.log(subs1)
        const subs2 = a2.substring(21, 37)
        // console.log(subs2)
        const messageUserId = itemData.item.userId;
        const isOwner = userId1 === itemData.item.userId;
        //console.log(isOwner)
        return <View style={styles.messagecont}>
            <Message message={itemData.item.value} isOwner1={isOwner} onReply={handleSwipeToReply} />
        </View>
    }
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>





                <View style={styles.listcont}>
                    <FlatList
                        data={messages}
                        renderItem={flatListItemRenderer}
                        inverted={true}
                    />
                </View>
                <Messagecomp onPressSend={sendMessageHandler} referencedText={referencedText} />




            </View >
        );
    }
};
export default Chatscreen;
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
    },
    container1: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    referencedTextContainer: {
        backgroundColor: '#f9b1b1',
        //position: 'absolute',
        padding: 8
        //paddingTop: 8,
        //paddingLeft: 16,
    },
    referencedText: {
        fontSize: 12,

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'left',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        flex: 1,
        padding: 8,
    },
});
