import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import ShadowButton from '../components/form/ShadowButton';
import { toggleDarkTheme } from '../features/theme/themeSlice';
import {
  createTransactions,
  saveTotalTransactionAmount,
} from '../features/transactions/transactionsSlice';
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
import { formatToPrice } from '../util/util';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const user = useSelector((state: any) => state.user.user);
  const totalAmount =
    useSelector((state: any) => state.transactions.total) ?? 0;
  const selectedColor = !isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;
  const selectedColorBg = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;

  const signOutUser = async () => {
    await signOut(auth);
    dispatch(deleteUser());
    dispatch(createTransactions(null));
    dispatch(saveTotalTransactionAmount(0));
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
          <Div paddingLeft={10} paddingRight={10} marginBottom={40}>
            <LGText fontWeight="bold">Balance:</LGText>
            <LGText
              color={totalAmount > 0 ? COLORS.GREEN : COLORS.RED}
              fontWeight="bold">
              {formatToPrice(totalAmount)}
            </LGText>
          </Div>
          <ShadowButton
            icon="person-outline"
            text="Personal"
            handleTouch={() => navigation.navigate('UpdateUser')}
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
