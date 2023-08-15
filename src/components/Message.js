//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
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
        height: 40,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        borderEndEndRadius: 10,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'bisque',
    },
    text: {
        color: '#333'
    },
});

//make this component available to the app
export default Message;
