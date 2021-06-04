import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  //Platform
} from "react-native";
import { Feather } from "@expo/vector-icons";
import wateringImg from "../assets/watering.png";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";
import { useNavigation } from "@react-navigation/core";

//Elemento de opacidade quando precionado TouchableOpacity
//SafeAreaView - msm coisa que o view, contudo ele vai trabalhar melhor os detalhes que os iphone tem para nao deixar texto em cima.
//!importan ele nao recebe padding

export const Welcome = () => {
  // const [visible, setVisible] = useState(false);

  // const handleVisibility = () => {
  //   setVisible((prevState) => !prevState);
  // };

  //const navigation = useNavigation()
  const { navigate } = useNavigation();

  const handleStart = () => {
    navigate("UserIdentification");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {"\n"}
          suas plantas de {"\n"}
          forma facil
        </Text>
        <Image style={styles.image} source={wateringImg} resizeMode="contain" />
        <Text style={styles.subtitle}>
          Nao esquece mais de regar suas plantas. Nos cuidamos de lembrar voce
          sempre que precisar.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.3}
          onPress={handleStart}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //No Android ta muito em cima
    // ...Platform.select({
    //   android: {
    //     marginTop: 20,
    //   },
    // }),
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around", //diferente do space-between, o around nao vai deixar colar nas bordas
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 38,
    lineHeight: 34,
  },
  image: {
    //React native trabalha com densidades de pixel.
    //width: 292,
    //height: 284,
    height: Dimensions.get("window").width * 0.7,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 15,
    height: 56,
    width: 56,
    //paddingHorizontal: 10,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },
});
