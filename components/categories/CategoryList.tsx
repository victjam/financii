import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Pressable } from 'react-native';
import {
  Container,
  Div,
  PrimaryButton,
  Text,
  TextButton,
  WrappedBox,
} from '../../styles/global';
import CustomInput from '../form/CustomInput';

const CATEGORIES = [
  {
    id: '1',
    title: 'Compras',
    icon: 'cart',
    color: '#4C4CB0',
  },
  {
    id: '2',
    title: 'Comida',
    icon: 'fast-food',
    color: '#884399',
  },
  {
    id: '3',
    title: 'Transporte',
    icon: 'car',
    color: '#b04c59',
  },
  {
    id: '4',
    title: 'Salud',
    icon: 'medkit',
    color: '#4fb04c',
  },
  {
    id: '5',
    title: 'Ropa',
    icon: 'shirt',
    color: '#b0714c',
  },
  {
    id: '6',
    title: 'Hogar',
    icon: 'home',
    color: '#4cb0a4',
  },
  {
    id: '7',
    title: 'Entretenimiento',
    icon: 'game-controller',
    color: '#744cb0',
  },
  {
    id: '8',
    title: 'Educación',
    icon: 'school',
    color: '#b04c74',
  },
  {
    id: '9',
    title: 'Otros',
    icon: 'help',
    color: '#F2A900',
  },
];

const CategoryList = ({ navigation }: any) => {
  const [categories, setCategories] = useState(CATEGORIES);
  const searchIfInclude = (title: string | any) => {
    const result = CATEGORIES.filter(category =>
      category.title.includes(title),
    );
    return result;
  };

  const {
    control,
    watch,

    setValue,
  } = useForm({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    const subscription = watch((value: any) => {
      if (value?.search.length > 0) {
        setCategories(searchIfInclude(value.search));
      } else {
        setCategories(CATEGORIES);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const selectCategory = (categoryName: string) => {
    navigation.navigate('AddTransaction', { categoryName });
  };

  const redirectToAddCategory = () => {
    setValue('search', '');
    navigation.navigate('AddCategory');
  };
  return (
    <Container>
      <Div paddingLeft={10} paddingRight={10}>
        <CustomInput name="search" label="Buscar categoria" control={control} />
      </Div>
      {categories.length !== 0 ? (
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({ item }: any) => (
            <Pressable onPress={() => selectCategory(item.title)}>
              <Div paddingLeft={10} paddingRight={10}>
                <Div
                  marginTop={30}
                  paddingLeft={20}
                  paddingRight={20}
                  paddingTop={10}
                  shadowWidth={0}
                  shadowHeight={4}
                  elevation={6}
                  shadowRadius={4}
                  shadowOpacity={0.9}
                  shadowColor="#0D365F"
                  paddingBottom={10}
                  backgroundColor={item.color}
                  height="100px"
                  width="100%"
                  flexDirection="row"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  borderRadius={5}>
                  <Text fontSize={28} fontWeight="bold">
                    {item.title}
                  </Text>
                  <Ionicons name={item.icon} size={50} color="white" />
                </Div>
              </Div>
            </Pressable>
          )}
        />
      ) : (
        <WrappedBox paddingBottom={200}>
          <Text fontWeight="bold" fontSize={25}>
            Ups, parece que no tenemos esa categoria en nuestro sistema,
          </Text>
          <Text marginTop={10} fontWeight="bold" fontSize={25}>
            ¿Deseas agregarla?
          </Text>
          <PrimaryButton
            marginTop={20}
            width="95%"
            borderRadius={5}
            marginBottom={50}
            onPressIn={() => redirectToAddCategory()}>
            <TextButton fontWeight="bold">Agregar Categoria</TextButton>
          </PrimaryButton>
        </WrappedBox>
      )}
    </Container>
  );
};

export default CategoryList;
