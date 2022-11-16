import React from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { TOGGLE_DARKTHEME } from '../store/theme/actions';
import {
  global,
  FONTS,
  PrimaryButton,
  TextButton,
  Container,
  WrappedBox,
  Text,
} from '../styles/global';

const Profile = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <WrappedBox>
        <ScrollView>
          <Text style={styles.title}>Profile page</Text>
          <PrimaryButton onPress={() => dispatch({ type: TOGGLE_DARKTHEME })}>
            <TextButton fontWeight="bold">Cambiar color</TextButton>
          </PrimaryButton>
        </ScrollView>
      </WrappedBox>
    </Container>
  );
};

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
    fontWeight: '600',
  },
});

export default Profile;
