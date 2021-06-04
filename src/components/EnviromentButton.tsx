import React from "react";
import { StyleSheet, Text } from "react-native";
//Instalado junto a navegacao do react native
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

interface EnviromentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

//como ele é opcional, ele ja vai vim como false, caso nao for passado
export const EnviromentButton = ({
  title,
  active = false,
  ...rest
}: EnviromentButtonProps) => {
  return (
    <RectButton
      style={[styles.container, active && styles.containerAtive]}
      {...rest}
    >
      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 76,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginRight: 5,
    backgroundColor: colors.shape,
  },
  containerAtive: {
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
});
