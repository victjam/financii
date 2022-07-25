import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { global } from '../styles/global';

const Home = () => (
    <SafeAreaView style={global.safeView}>
        <View style={global.initialPadding}>
            <Text style={styles.text}>Page content</Text>
        </View>
    </SafeAreaView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    }
});



export default Home;