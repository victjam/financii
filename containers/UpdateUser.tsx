import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/form/CustomInput';
import { toggleLoader } from '../features/loader/loaderSlice';
import { createUser } from '../features/user/userSlice';
import { User } from '../models/User';
import { onChangeEmailWithAuth } from '../services/user';
import {
  Container,
  Div,
  PrimaryButton,
  REGEX,
  Text,
  TextButton,
  WrappedBox,
} from '../styles/global';

const UpdateUser = () => {
  const navigation = useNavigation();
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      email: '',
      name: '',
      lastName: '',
      password: '',
    },
  });

  useEffect(() => {
    setValue('email', user.email);
    setValue('name', user.name);
    setValue('lastName', user.lastName);
  }, [user, setValue]);

  const signup = () => {
    handleUpdateUser();
  };

  const userObjectData = () => {
    const userObject: User = {};
    if (watch('email') !== user.email) {
      userObject.email = watch('email');
    }
    if (watch('name') !== user.name) {
      userObject.name = watch('name');
    }
    if (watch('lastName') !== user.lastName) {
      userObject.lastName = watch('lastName');
    }
    if (watch('password') !== '') {
      userObject.password = watch('password');
    }
    return userObject;
  };

  const isAnEmptyObject = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  const handleUpdateUser = async () => {
    dispatch(toggleLoader());
    const userData = userObjectData();
    if (isAnEmptyObject(user)) {
      alert('No hay cambios');
      dispatch(toggleLoader());
      return;
    } else {
      try {
        const userInfo = await onChangeEmailWithAuth(user.uid, userData);
        console.log(userInfo);
        dispatch(createUser(userInfo));
        navigation.navigate('Profile');
        setTimeout(() => {
          dispatch(toggleLoader());
        }, 500);
      } catch (error) {
        dispatch(toggleLoader());
        navigation.navigate('Login');
        console.log(Error);
      }
    }
    // try {
    //   await onChangeEmailWithAuth(user.email, userData);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Container>
      <WrappedBox paddingBottom={20}>
        <ScrollView>
          <Div>
            <Text paddingTop={20} fontSize={20} fontWeight="bold">
              Actualiza tu usuario
            </Text>
            <CustomInput
              name="name"
              label="Nombres"
              control={control}
              rules={{
                required: 'El nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre tiene que ser mayor a 3 caracteres',
                },
              }}
            />
            <CustomInput
              name="lastName"
              label="Apellidos"
              control={control}
              rules={{
                required: 'El apellido es requerido',
                minLength: {
                  value: 3,
                  message: 'El apellido tiene que ser mayor a 3 caracteres',
                },
              }}
            />
            <CustomInput
              name="email"
              label="Email"
              control={control}
              rules={{
                pattern: { value: REGEX.email, message: 'Email invalido' },
              }}
            />
            <CustomInput
              name="password"
              label="Contraseña"
              secureTextEntry
              control={control}
            />
            <Div paddingTop={10}>
              <PrimaryButton onPress={handleSubmit(signup)}>
                <TextButton fontWeight="bold">Actualizar usuario</TextButton>
              </PrimaryButton>
            </Div>
          </Div>
        </ScrollView>
      </WrappedBox>
    </Container>
  );
};

export default UpdateUser;
