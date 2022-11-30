import { useIsFocused } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Category } from '../../models/Category';
import { deleteCategory, getCategories } from '../../services/categories';

import { useDispatch } from 'react-redux';
import {
  Container,
  Div,
  PrimaryButton,
  Text,
  TextButton,
  WrappedBox,
} from '../../styles/global';
import CustomInput from '../form/CustomInput';
import CategoryRenderList from './CategoryRenderList';

const CategoriesByUser = ({ navigation }: any) => {
  const user = useSelector((state: any) => state.user.user);
  const isFocused = useIsFocused();
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
  const dispatch = useDispatch();
  let flatListRef = useRef(null);

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
          category.userId === user.uid &&
          category.private &&
          !category.isDeleted,
      );
      return privateCat;
    };
    const getCategoriesData = async () => {
      const categoriesDataObj: any = await getCategories();
      if (categoriesDataObj) {
        setGlobalCategories(filterByUser(categoriesDataObj));
        setCategories(filterByUser(categoriesDataObj));
      }
    };
    getCategoriesData();
  }, [user, isFocused, dispatch]);

  const redirectToAddCategory = () => {
    setValue('search', '');
    navigation.navigate('AddCategory');
  };

  const onRemoveCategory = async (category: Category) => {
    await deleteCategory(category.id);
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
          ref={flatListRef}
          keyExtractor={item => item.id}
          renderItem={({ item }: any) => (
            <CategoryRenderList
              category={item}
              simultaneousHandlers={flatListRef}
              onDismiss={onRemoveCategory}
            />
          )}
        />
      ) : (
        <WrappedBox paddingBottom={200}>
          <Text fontWeight="bold" fontSize={25}>
            Ups, parece que no tienes esa categoria en nuestro sistema,
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

export default CategoriesByUser;
