import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from "react-native";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

//Lembra q o extends Vai pegar tudo daquela classe e jogar pra ele.
interface ButtonProps extends TouchableOpacityProps {
  text: string;
}
//rest sempre vai por ultimo
export const Button = ({ text, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.3} {...rest}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
});
