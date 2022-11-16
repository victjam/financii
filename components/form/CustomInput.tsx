import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { COLORS, FONTS, InputField, Text } from '../../styles/global';

const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 100,
  },
  inputBox: {
    marginTop: 15,
  },
  error: {
    paddingTop: 1,
    fontWeight: 'bold',
    fontSize: FONTS.xxxs,
  },
});
const CustomInput = ({
  label,
  name,
  control,
  rules = {},
  secureTextEntry,
}: any) => {
  return (
    <View style={styles.inputBox}>
      <Text paddingBottom={5}>{label}</Text>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View>
            <InputField
              style={[{ borderColor: error ? COLORS.DANGER : COLORS.GRAY }]}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              onChangeText={onChange}
              value={value}
            />
            {error && (
              <Text
                style={[
                  styles.error,
                  { color: error ? COLORS.DANGER : COLORS.GRAY },
                ]}>
                {error.message ?? 'Error'}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default CustomInput;
