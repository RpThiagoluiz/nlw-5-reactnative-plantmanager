import React, { useState } from "react";
import {
  //View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  //Platform
} from "react-native";
import wateringImg from "../assets/watering.png";
import { Button } from "../components/Button";
import { colors } from "../styles/colors";

//Elemento de opacidade quando precionado TouchableOpacity
//SafeAreaView - msm coisa que o view, contudo ele vai trabalhar melhor os detalhes que os iphone tem para nao deixar texto em cima.

export const Welcome = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {"\n"}
        suas plantas {"\n"}
        de forma facil
      </Text>
      {visible && <Image style={styles.image} source={wateringImg} />}
      <Text style={styles.subtitle}>
        Nao esquece mais de regar suas plantas. Nos cuidamos de lembrar voce
        sempre que precisar.
      </Text>
      <Button title="Monstar Imagem" onPress={handleVisibility} />
      <Button title="Ocultar Imagem" onPress={handleVisibility} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    //No Android ta muito em cima
    // ...Platform.select({
    //   android: {
    //     marginTop: 20,
    //   },
    // }),
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
  },
  image: {
    width: 292,
    height: 284,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 15,
    height: 56,
    width: 56,
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
  },
});
