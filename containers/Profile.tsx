import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import ShadowButton from '../components/form/ShadowButton';
import { toggleDarkTheme } from '../features/theme/themeSlice';
import { deleteUser } from '../features/user/userSlice';
import { auth } from '../firebase';
import {
  COLORS,
  Container,
  Div,
  DivIcon,
  LGText,
  Text,
} from '../styles/global';

const Profile = () => {
  const dispatch = useDispatch();
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const user = useSelector((state: any) => state.user.user);
  const selectedColor = !isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;
  const selectedColorBg = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;

  const signOutUser = async () => {
    await signOut(auth);
    dispatch(deleteUser());
  };

  return (
    <Container>
      <Div
        height="100%"
        styles={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Div>
          <Div
            paddingLeft={10}
            paddingRight={10}
            marginTop={40}
            marginBottom={30}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <DivIcon
              marginBottom={5}
              backgroundColor={selectedColorBg}
              style={{ borderRadius: 50 }}
              align="center"
              paddingLeft={10}
              paddingRight={10}>
              <Ionicons name="person-outline" color={selectedColor} size={26} />
            </DivIcon>
            <Text>
              {user?.name} {user?.lastName}
            </Text>
          </Div>
          <Div paddingLeft={10} paddingRight={10} marginBottom={20}>
            <LGText>Balance Total</LGText>
            <Text>$200.000</Text>
          </Div>
          <ShadowButton
            icon="person-outline"
            text="Personal"
            handleTouch={() => alert('touch')}
          />
          <ShadowButton
            icon="md-swap-horizontal"
            text="Cambiar tema"
            handleTouch={() => dispatch(toggleDarkTheme())}
          />
        </Div>
        <ShadowButton
          icon="exit-outline"
          text="Cerrar sesion"
          handleTouch={() => signOutUser()}
        />
      </Div>
    </Container>
  );
};

export default Profile;
