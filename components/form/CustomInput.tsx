import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { IInput } from '../../models/Input.interface'
import { FONTS, COLORS } from '../../styles/global';
import { Controller } from "react-hook-form";

const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 100
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    fontSize: FONTS.xxs,
    padding: 10,
    borderColor: COLORS.gray
  },
  label: {
    fontSize: FONTS.xxs,
    paddingBottom: 5,
    color: COLORS.black
  },
  inputBox: {
    marginTop: 15,
  },
  error: {
    paddingTop: 1,
    fontWeight: 'bold',
    fontSize: FONTS.xxxs
  }
})
const CustomInput = ({ label, name, control, rules = {}, secureTextEntry }: any) => {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View>
            <TextInput style={[styles.input, { borderColor: error ? COLORS.danger : COLORS.gray }]}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              onChangeText={onChange}
              value={value} />
            {error && <Text style={[styles.error, { color: error ? COLORS.danger : COLORS.gray }]}>{error.message || 'Error'}</Text>}
          </View>
        )}
      />
    </View>
  )
}

export default CustomInput