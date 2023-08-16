//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../Constants/Colors';

const Message = ({ message, isOwner }) => {
    return (
        <View style={styles.container.isOwner ? styles.messcontainerright : styles.messcontainerright}>
            <Text style={styles.text.isOwner ? styles.textright : styles.textleft}>{message}</Text>
        </View>
    );
};
Message.propTypes = {
    message: PropTypes.string,
};
// define your styles
const styles = StyleSheet.create({
    container: {
        width: '80%',
        borderRadius: 20,
        justifyContent: 'center',
        padding: 10,
    },
    messcontainerleft: {
        width: '80%',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
        backgroundColor: Colors.lightMessageBackground,
    },
    messcontainerright: {
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
        textAlign: 'right'
    }
});

//make this component available to the app
export default Message;
