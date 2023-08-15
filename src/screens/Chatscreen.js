//import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Messagecomp from '../components/messagecomp';

// create a component
const Chatscreen = () => {
    return <View style={styles.container}>
        <Messagecomp />;
    </View>

};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 5,
    },
});

//make this component available to the app
export default Chatscreen;
