import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { Header } from "../components/Header";
import dropWater from "../assets/waterdrop.png";
import { colors } from "../styles/colors";
import { PlantsProps, loadPlantsInStorage } from "../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { fonts } from "../styles/fonts";
import { PlantCartSecondary } from "../components/PlantCartSecondary";

export const MyPlantsSave = () => {
  const [myPlants, setMyPlants] = useState<PlantsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextWaterd, setNextWaterd] = useState("");

  useEffect(() => {
    const loadStorageData = async () => {
      const plantsStoraged = await loadPlantsInStorage();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWaterd(
        `Nao esqueca de regar a ${plantsStoraged[0].name} a ${nextTime} horas`
      );
      setMyPlants(plantsStoraged);
      setLoading(false);
    };

    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image style={styles.spotlightImage} source={dropWater} />
        <Text style={styles.spotlightText}>{nextWaterd}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Proximas Regadas</Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          //contentContainerStyle={{ flex: 1 }}
          renderItem={({ item }) => <PlantCartSecondary data={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    //textAlign: "justify",
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
