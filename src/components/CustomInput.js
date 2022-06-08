import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function CustomInput({
  label,
  icon,
  iconPass,
  inputType,
  keyboardType,
  securePass,
  fieldButtonFunction,
  onChange,
  value,
  onBlur,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          secureTextEntry={securePass}
          onChangeText={onChange}
          value={value}
          onBlur={onBlur}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          onChangeText={onChange}
          value={value}
          onBlur={onBlur}
          style={{flex: 1, paddingVertical: 0}}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        {iconPass}
      </TouchableOpacity>
    </View>
  );
}
