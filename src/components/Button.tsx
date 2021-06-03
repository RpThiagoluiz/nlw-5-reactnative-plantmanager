import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { colors } from "../styles/colors";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

// ...rest ela vai vim do props do TouchableOpacity
export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.3} {...rest}>
      <Text style={styles.buttonText}> {title} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 15,
    height: 56,
    //width: 56,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
  },
});
