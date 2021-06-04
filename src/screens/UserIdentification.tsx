import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Button } from "../components/Button";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

//!import
//KeyboardAvoidingView -> ele nao vai permitir que o teclado nao fique por cima de tudo.
//Ele vai em volta de tudo e fica estiloso

export const UserIdentification = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [enteredName, setEnteredName] = useState(""); //ou pode flar tbm q ele sera uma string -< useState<string>() >-

  const handleInputBlur = () => {
    //Quando sai
    setIsFocused(false);
    //Msm esquema de verificacao se tem dados validos dentro do input
    setIsFilled(!!enteredName);
  };

  const handleInputFocus = () => {
    //Quando clica
    setIsFocused(true);
  };

  const handleInputChange = (value: string) => {
    //Por padrao o onChangeText ja recebe por inferencia o value.
    //Se tem conteudo, verdadeiro, caso nao falso
    //lembra q isso acontece por causa da inteligencia do js
    setIsFilled(!!value);
    setEnteredName(value);
  };

  const { navigate } = useNavigation();

  const handleConfirmation = () => {
    if (!!enteredName) {
      navigate("Confirmation");
    } else {
      alert(`Preencha o nome primeiro`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{isFilled ? "🤗" : "😞"}</Text>
                <Text style={styles.title}>
                  Como podemos {"\n"}
                  chamar voce ?
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Digite seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={styles.footer}>
                <Button text="Comecar" onPress={handleConfirmation} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 54,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  emoji: {
    fontSize: 44,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },
  //Melhor passar o espacamento em um container q envolva o component.
  footer: {
    marginTop: 40,
    width: "100%",
    //Esse padding vai diminuir o tamanho total do button tipo o width dele.
    paddingHorizontal: 20,
  },
});
