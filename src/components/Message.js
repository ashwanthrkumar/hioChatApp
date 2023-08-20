import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, TextInput, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../Constants/Colors';
import { TouchableOpacity } from 'react-native';
import Messagecomp from './Messagecomp';

const Message = ({ message, isOwner1, onReply }) => {
    // Create an Animated.ValueX to track the swipe gesture
    const [swipeX] = useState(new Animated.Value(0));
    const [replyTriggered, setReplyTriggered] = useState(false);
    //const [replyText, setReplyText] = useState('');
    //const replyInputRef = useRef(null);
    // Define a PanResponder to handle swipe gestures
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            if (gestureState.dx > 30 && !replyTriggered) {
                setReplyTriggered(true);
            }
            swipeX.setValue(gestureState.dx);
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > 30 && replyTriggered) {
                // Implement your reply action here
                console.log('Swipe to reply triggered');

                onReply(message);

            } else {


                setReplyTriggered(false);
            }
            swipeX.setValue(0);

        },
    });
    const translateY = swipeX.interpolate({
        inputRange: [0, 50],
        outputRange: [0, 1], // Adjust this value for the desired downward animation distance
        extrapolate: 'clamp',
    });

    return (


        <Animated.View
            style={[
                styles.container,
                isOwner1 ? styles.messcontainerright : styles.messcontainerleft,
                { transform: [{ translateX: swipeX }, { translateY }] },
            ]}
            {...panResponder.panHandlers}
        >
            <Text style={[styles.text, isOwner1 ? styles.textright : styles.textleft]}>

                {message}
            </Text>




        </Animated.View>


        //</ScrollView>

    );
};

Message.propTypes = {
    message: PropTypes.string,
    isOwner1: PropTypes.bool,
    onReply: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        borderRadius: 20,
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row', // Allow swipe gestures horizontally
    },
    messcontainerleft: {
        width: 'auto',
        padding: 8,
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
        backgroundColor: Colors.lightMessageBackground,
    },
    messcontainerright: {
        width: 'auto',
        borderRadius: 20,
        padding: 10,
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
        backgroundColor: Colors.darkMessageBackground,
    },
    text: {
        color: '#333',
        lineHeight: 25,

    },
    textleft: {
        textAlign: 'left',
    },
    textright: {
        textAlign: 'right',
    },

});

export default Message;
