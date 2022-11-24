import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ColorPicker } from 'react-native-color-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../services/categories';
import {
  COLORS,
  Container,
  Div,
  LGText,
  PrimaryButton,
  PrimaryButtonWithIcon,
  Text,
  TextButton,
  WrappedBox,
} from '../../styles/global';
import CustomInput from '../form/CustomInput';

const AddCategory = ({ navigation }: any) => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );

  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const route = useRoute();
  const icon = route?.params?.icon ?? undefined;
  const [color, setColor] = useState('');
  const generateRamdonHexColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const {
    control,
    handleSubmit,
    watch,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: '',
      color: '',
    },
  });

  const submitCategory = async () => {
    const category = {
      title: watch('Name').toLocaleLowerCase(),
      icon: icon,
      color: color ?? generateRamdonHexColor(),
      private: true,
      userId: user.uid,
    };
    await addCategory(category);
    navigation.navigate('CategoryList', { reload: true });
  };
  // watch(data);

  return (
    <Container>
      <WrappedBox>
        <LGText paddingTop={20} fontWeight="bold">
          Agrega una categoria
        </LGText>
        <CustomInput name="Name" label="Nombre" control={control} />
        <PrimaryButtonWithIcon
          marginTop={20}
          marginBottom={20}
          style={{ height: 50 }}
          onPress={() => navigation.navigate('IconList')}>
          {icon ? (
            <Ionicons
              style={{ marginRight: 10 }}
              name={icon}
              size={24}
              color={isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE}
            />
          ) : (
            <Ionicons
              style={{ marginRight: 10 }}
              name="add"
              size={24}
              ccolor={isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE}
            />
          )}
          <TextButton fontWeight="bold">Agregar Icono</TextButton>
        </PrimaryButtonWithIcon>

        <Text paddingTop={20}>
          Selecciona un color (girando en la rueda y dandole tap al circulo de
          tu color)
        </Text>
        <ColorPicker
          onColorSelected={color => setColor(color)}
          style={{ flex: 1 }}
        />
        <Div paddingTop={30}>
          <PrimaryButton
            disabled={watch('Name').length === 0 || !icon}
            style={{ height: 50 }}
            onPress={handleSubmit(submitCategory)}>
            <TextButton fontWeight="bold">Agregar categoria</TextButton>
          </PrimaryButton>
        </Div>
      </WrappedBox>
    </Container>
  );
};

export default AddCategory;
