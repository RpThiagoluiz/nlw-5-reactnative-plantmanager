import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userImg from "../assets/thiago.png";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

export const Header = () => {
  const [userName, setUserName] = useState("");

  //trazer o nome sempre q ele mudar
  useEffect(() => {
    const findNameInAsyncStorage = async () => {
      const user = await AsyncStorage.getItem("@nlw#5_rn_plantManager:user");
      //Como tem validacao sempre vai ter valor, mais o type intende q ele pode vim null.
      setUserName(user || "Anonimous");
    };
    findNameInAsyncStorage();
  }, [userName]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.greeting}>Ola,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>

        <Image style={styles.image} source={userImg} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    //No Android ta muito em cima
    ...Platform.select({
      android: {
        marginTop: 35,
      },
      ios: {
        marginTop: 20,
      },
    }),
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //padding: 20,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35, //Metade do tamanho da imagem.
  },
});
