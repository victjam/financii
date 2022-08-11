import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { global, FONTS } from '../styles/global';


const Transactions = () => (
  <SafeAreaView style={global.safeView}>
    <View style={[global.initialPadding, styles.paddingTop]}>
      <Text style={styles.title}>Transactions page</Text>
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 30,
  },
  name: {
    paddingTop: 5,
    fontSize: FONTS.xs,
  },
  title: {
    fontSize: FONTS.s,
    fontWeight: '600'
  }
});



export default Transactions;