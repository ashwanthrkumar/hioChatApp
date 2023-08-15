//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Users from '../tabs/Users';
import Settings from '../tabs/Settings';
// create a component
const Main = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <View style={styles.container}>
            {selectedTab == 0 ? (<Users />) : (<Settings />)}
            <View style={styles.bottomtab}>
                <TouchableOpacity style={styles.tab} onPress={() => {
                    setSelectedTab(0);
                }}>
                    <Image
                        source={require('../images/Leadership.png')}
                        style={[styles.tabicon, { tintColor: selectedTab == 0 ? 'white' : 'grey' },]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => {
                    setSelectedTab(1);
                }}>
                    <Image
                        source={require('../images/Lecturer.png')}
                        style={[styles.tabicon, { tintColor: selectedTab == 1 ? 'white' : 'grey' },]}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: 'white',
    },
    bottomtab: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
        backgroundColor: '#ac0000',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    tab: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabicon: {
        width: 30,
        height: 30,
    },
});

//make this component available to the app
export default Main;
