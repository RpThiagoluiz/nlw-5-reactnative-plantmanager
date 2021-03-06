import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

interface PlantProps extends RectButtonProps {
  //Somente pegando os dados q ele quer.
  data: {
    name: string;
    photo: string;
  };
}

export const PlantCartPrimary = ({ data, ...rest }: PlantProps) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <Text style={styles.text}>{data.name}</Text>
      <SvgFromUri uri={data.photo} width={70} height={70} />
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "45%",
    backgroundColor: colors.shape,
    borderRadius: 20,
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16,
  },
});
