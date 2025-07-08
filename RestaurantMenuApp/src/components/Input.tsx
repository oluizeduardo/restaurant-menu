import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
} from "react-native";
import { input_styles } from "../styles/input";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const Input = ({ label, error, ...rest }: InputProps) => {
  return (
    <View style={input_styles.container}>
      <Text style={input_styles.label}>{label}</Text>
      <TextInput style={input_styles.input} placeholderTextColor="#999" {...rest} />
      {error && <Text style={input_styles.error}>{error}</Text>}
    </View>
  );
};