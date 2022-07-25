import React from 'react';
import { Text, Dimensions, StyleSheet, Image, SafeAreaView, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { global } from '../styles/global';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    marginBottom: {
        marginBottom: 40
    },
    image: {
        width: windowWidth,
        height: windowWidth
    }
})
const Main = ({ navigation }: any) => (
    <SafeAreaView style={global.safeView}>
        <View style={global.initialPadding}>
            <Image
                style={styles.image}
                source={require('../assets/yogi.gif')}
            />
            <View style={styles.marginBottom}>
                <Text style={[global.h5, global.left, global.marginBottom]}>ALPHA VERSION</Text>
                <Text style={[global.h2, global.left]}>Bienvenidos a</Text>
                <Text style={[global.h1, global.left, global.marginBottom]}>Financii</Text>
                <Text style={global.center}>Una app para gestionar tus gatos y metas de la forma mas segura y simple posible.</Text>
            </View>
            <View style={[styles.marginBottom, global.centerElement]}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={global.buttonPrimary}>
                    <Text style={global.buttonPrimaryText}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
            <View></View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                <Text style={global.hyperlinkText}>Ya tienes una cuenta?, inicia
                    <Text style={global.highlight}> aqui.</Text>
                </Text>
            </TouchableWithoutFeedback>
        </View>
    </SafeAreaView>
)

export default Main;