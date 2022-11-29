import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ColorPicker } from 'react-native-color-picker';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoader } from '../../features/loader/loaderSlice';
import { addCategory, updateCategory } from '../../services/categories';
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
  const categoryData = route?.params?.category ?? undefined;
  const [category, setCategory] = useState<any>(null);
  const [color, setColor] = useState('');
  const generateRamdonHexColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: '',
      color: '',
    },
  });

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData);
      setColor(categoryData.color);
      setValue('Name', categoryData.title);
    }
  }, [categoryData, setValue]);

  const newCategories = (category: any) => {
    const newCategory = {
      ...category,
      icon: icon ? icon : category.icon,
      title: watch('Name'),
      color: color,
    };
    return newCategory;
  };

  const submitCategory = async () => {
    try {
      dispatch(toggleLoader());
      if (category) {
        const newCat = newCategories(category);
        await updateCategory(category.id, newCat);
        navigation.goBack();
      } else {
        console.log(color);
        const categoryObj = {
          title: watch('Name').toLocaleLowerCase(),
          icon: icon,
          color: color ?? generateRamdonHexColor(),
          private: true,
          userId: user.uid,
        };
        await addCategory(categoryObj);
        navigation.goBack();
      }
      setTimeout(() => {
        dispatch(toggleLoader());
      }, 500);
    } catch (error) {
      console.log(error);
      dispatch(toggleLoader());
    }
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
          {category ? (
            <PrimaryButton
              disabled={watch('Name').length === 0}
              style={{ height: 50 }}
              onPress={handleSubmit(submitCategory)}>
              <TextButton fontWeight="bold">Actualizar categoria</TextButton>
            </PrimaryButton>
          ) : (
            <PrimaryButton
              disabled={watch('Name').length === 0 || !icon}
              style={{ height: 50 }}
              onPress={handleSubmit(submitCategory)}>
              <TextButton fontWeight="bold">Agregar categoria</TextButton>
            </PrimaryButton>
          )}
        </Div>
      </WrappedBox>
    </Container>
  );
};

export default AddCategory;
