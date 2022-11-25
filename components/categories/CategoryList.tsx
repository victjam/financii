import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Category } from '../../models/Category';
import { getCategories } from '../../services/categories';

import {
  Container,
  Div,
  PrimaryButton,
  Text,
  TextButton,
  WrappedBox,
} from '../../styles/global';
import CustomInput from '../form/CustomInput';

const CategoryList = ({ navigation }: any) => {
  const user = useSelector((state: any) => state.user.user);
  const route = useRoute();
  const onReload = route?.params?.reload ?? undefined;
  const [globalCategories, setGlobalCategories] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);

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
    const searchIfInclude = (title: string | any) => {
      const result = globalCategories.filter((category: any) =>
        category.title.includes(title.toLowerCase()),
      );
      return result;
    };

    const subscription = watch((value: any) => {
      if (value?.search.length > 0) {
        setCategories(searchIfInclude(value.search));
      } else {
        setCategories(globalCategories);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, globalCategories]);

  useEffect(() => {
    const filterByUser = (categories: Category[]) => {
      const privateCat = categories.filter(
        (category: Category) =>
          category.userId === user.uid && category.private,
      );
      const publicCat = categories.filter(
        (category: Category) => category.private === false,
      );
      return [...privateCat, ...publicCat];
    };
    const getCategoriesData = async () => {
      const categoriesDataObj: any = await getCategories();
      if (categoriesDataObj) {
        setGlobalCategories(filterByUser(categoriesDataObj));
        setCategories(filterByUser(categoriesDataObj));
      }
    };
    getCategoriesData();
  }, [user, onReload]);

  const selectCategory = (category: Category) => {
    navigation.navigate('AddTransaction', {
      id: category.id,
      title: category.title,
      icon: category.icon,
    });
  };

  const upperCaseFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const redirectToAddCategory = () => {
    setValue('search', '');
    navigation.navigate('AddCategory');
  };
  return (
    <Container>
      <Div paddingLeft={10} paddingRight={10}>
        <CustomInput name="search" label="Buscar categoria" control={control} />
        {categories.length > 0 ? (
          <PrimaryButton
            marginTop={20}
            width="100%"
            borderRadius={5}
            marginBottom={20}
            onPressIn={() => redirectToAddCategory()}>
            <TextButton fontWeight="bold">Agregar Categoria</TextButton>
          </PrimaryButton>
        ) : null}
      </Div>
      {categories.length !== 0 ? (
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({ item }: any) => (
            <Pressable onPress={() => selectCategory(item)}>
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
                  <Text fontSize={28} fontWeight="bold" color="white">
                    {upperCaseFirstLetter(item.title)}
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