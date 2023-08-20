//import liraries
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
const Messagecomp = ({ onPressSend, referencedText }) => {
    console.log(onPressSend);
    console.log(referencedText);
    const [message, setMessage] = useState('');
    const hiddenTextInputRef = useRef(null);
    const [showReferencedText, setShowReferencedText] = useState(true); // Manage the visibility of referencedText
    const [showTextInput, setShowTextInput] = useState(false); // Control the visibility of the TextInput
    useEffect(() => {
        // Show the TextInput when referencedText is present
        if (referencedText) {
            hiddenTextInputRef.current.focus();
        }
    }, [referencedText]);
    const changeTextHandler = (value) => {
        setMessage(value);
    };
    const submitMessageHandler = () => {
        //return value
        if (message) {
            onPressSend(message);
            setMessage('');
            setShowReferencedText(false);
        }
    }
    return (


        <View style={styles.mcontainer}>
            {showReferencedText && referencedText ? (
                <View style={styles.referencedTextContainer}>
                    <Text style={styles.intext}>Replying To:</Text>
                    <Text style={styles.referencedText}>{referencedText.length > 15 ? referencedText.slice(0, 15) + '...' : referencedText}</Text>
                </View>
            ) : null}
            {/* Hidden TextInput */}
            <TextInput
                ref={hiddenTextInputRef}
                style={{ height: 0, width: 0 }} // Make it hidden
                onChangeText={() => { }}
            />
            <View style={styles.textcontainer}>
                <TextInput ref={hiddenTextInputRef} value={message} placeholder='Type Message' onChangeText={changeTextHandler} onSubmitEditing={submitMessageHandler} style={styles.input} />
            </View>
            <TouchableOpacity style={styles.buttoncontainer} onPress={submitMessageHandler}>
                <Icon name='send' size={25} color={'black'} />
            </TouchableOpacity>

        </View>
    );
};
Messagecomp.propTypes = {
    onPressSend: PropTypes.func,
    referencedText: PropTypes.string
}
// define your styles
const styles = StyleSheet.create({
    mcontainer: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 25,
    },
    referencedTextContainer: {
        //flex: 1,
        paddingLeft: '3%',
    },
    referencedText: {
        fontSize: 10,
        color: '#ac0000',
    },
    input: {
        color: 'grey',
        textDecorationColor: 'red',
    },
    intext: {
        fontSize: 12
    },
    textcontainer: {
        flex: 1,
        marginHorizontal: 50,
        color: 'grey',
    },
    buttoncontainer: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 25,

    }
});

//make this component available to the app
export default Messagecomp;
