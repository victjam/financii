import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ColorPicker } from 'react-native-color-picker';
import {
  Container,
  Div,
  LGText,
  PrimaryButton,
  Text,
  TextButton,
  WrappedBox,
} from '../../styles/global';
import CustomInput from '../form/CustomInput';

const AddCategory = ({ navigation }: any) => {
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

  const submitCategory = () => {
    const category = {
      name: watch('Name'),
      color: color ?? generateRamdonHexColor(),
    };
    navigation.navigate('CategoryList', { reload: true });
    console.log(category);
  };
  // watch(data);

  return (
    <Container>
      <WrappedBox>
        <LGText paddingTop={20} fontWeight="bold">
          Agrega una categoria
        </LGText>
        <CustomInput name="Name" label="Nombre" control={control} />
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
            disabled={!color && watch('Name').length === 0}
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
