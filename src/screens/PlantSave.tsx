import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/core";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { isBefore, format } from "date-fns";
import { SvgFromUri } from "react-native-svg";
import dropWater from "../assets/waterdrop.png";
import { Button } from "../components/Button";
import { PlantsProps, savePlantInStorage } from "../libs/storage";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

interface PlantParams {
  plant: PlantsProps;
}

export const PlantSave = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date()); //Padrao ele sera uma nova dataset
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const { navigate } = useNavigation();
  const route = useRoute();
  const { plant } = route.params as PlantParams;

  const handleChangeTime = (event: Event, dateTime: Date | undefined) => {
    //vc colcoar em cima do onChange do dateTimePicker ele ja fala oq vem

    if (Platform.OS === "android") {
      setShowDatePicker((prevState) => !prevState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert(`Escolha um hora no futuro! 🕰`);
    }

    if (dateTime) setSelectedDateTime(dateTime);
  };

  const handleOpenDateTimePickerForAndroid = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  const handleSavePlant = async () => {
    try {
      await savePlantInStorage({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigate("Confirmation", {
        title: "Tudo certo",
        subtitle:
          "Fique tranquilo que sempre vamos lembrar voce de cuidar da sua plantinha com muito cuidado.",
        buttonTitle: "Muito obrigado ☺",
        icon: "hug",
        nextScreen: "MyPlantsSave",
      });
    } catch (error) {
      Alert.alert(`Nao foi possivel salvar. 🙅‍♀️`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />

        <Text style={styles.plantName}> {plant.name}</Text>

        <Text style={styles.plantAbount}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image style={styles.tipImage} source={dropWater} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horario para ser lembrado:
        </Text>
        {showDatePicker && (
          //Tbm pega no Android mas eu quis fazer assim igual ele pra ve como q fica
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === "android" && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
          >
            <Text style={styles.dateTimePickerText}>{`Mudar ${format(
              selectedDateTime,
              "HH:mm"
            )}`}</Text>
          </TouchableOpacity>
        )}

        <Button text="Cadastrar Planta" onPress={handleSavePlant} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbount: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    //ficar lindao
    position: "relative",
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: "justify",
  },
  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
