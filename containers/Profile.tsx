import { signOut } from 'firebase/auth';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleDarkTheme } from '../features/theme/themeSlice';
import { deleteUser } from '../features/user/userSlice';
import { auth } from '../firebase';
import {
  Container,
  FONTS,
  PrimaryButton,
  Text,
  TextButton,
  WrappedBox,
} from '../styles/global';

const Profile = () => {
  const dispatch = useDispatch();

  const signOutUser = async () => {
    await signOut(auth);
    dispatch(deleteUser());
  };

  return (
    <Container>
      <WrappedBox>
        <ScrollView>
          <Text style={styles.title}>Profile page</Text>
          <PrimaryButton onPress={() => dispatch(toggleDarkTheme())}>
            <TextButton fontWeight="bold">Cambiar color</TextButton>
          </PrimaryButton>
          <PrimaryButton onPress={() => signOutUser()}>
            <TextButton fontWeight="bold">Log out</TextButton>
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
