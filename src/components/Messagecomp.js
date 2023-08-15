//import liraries
import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
//import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
const Messagecomp = () => {
    return (
        <View style={styles.mcontainer}>
            <View style={styles.textcontainer}>
                <TextInput value='' placeholder='Type Message' />
            </View>
            <TouchableOpacity style={styles.buttoncontainer} onPress={() => { }}>
                <Icon name='send' size={25} color={'black'} />
            </TouchableOpacity>

        </View>
    );
};

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
    textcontainer: {
        flex: 1,
        marginHorizontal: 19,

    },
    buttoncontainer: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 25,

    }
});

//make this component available to the app
export default Messagecomp;
