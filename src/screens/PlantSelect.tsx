import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/core";
import { EnviromentButton } from "../components/EnviromentButton";
import { Header } from "../components/Header";
import { PlantCartPrimary } from "../components/PlantCartPrimary";
import { PlantsProps } from "../libs/storage";
import { Load } from "../components/Load";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

interface EnviromentProps {
  key: string;
  title: string;
}

export const PlantSelect = () => {
  const [enviroment, setEnviroment] = useState<EnviromentProps[]>();
  const [plants, setPlants] = useState<PlantsProps[]>([]); //Passar um array vazio, ele nao vem como undefined

  //filtro
  const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState("all");
  const [loading, setLoading] = useState(true);

  //Pagination
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(true); //outra animacao de rolagem

  //Navi por planta Selecionada
  const { navigate } = useNavigation();

  const fetchPlants = async () => {
    //Promise, depende de varios fatores externos, ping, e blabla
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );
    if (!data) return setLoading(true);

    if (page > 1) {
      setPlants((prevState) => [...prevState, ...data]);
      setFilteredPlants((prevState) => [...prevState, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }
    //paginacao quero trazer 8 por pagina

    setLoading(false);
    setLoadingMore(false);
  };

  const handleEnviromentSelected = (enviroment: string) => {
    setEnviromentSelected(enviroment);
    if (enviroment === "all") return setFilteredPlants(plants);
    //Clicar em todos vai trazer todas as plantas
    const filtered = plants.filter((plant) =>
      plant.environments.includes(enviroment)
    );

    setFilteredPlants(filtered);
  };

  const handleFetchMore = (distance: number) => {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((prevState) => prevState + 1);
    fetchPlants();
  };

  const handlePlantSelected = (plant: PlantsProps) => {
    //Plant ja ta vindo no click - vc tbm ja pode passar ela por aq.
    navigate("PlantSave", { plant });
  };

  useEffect(() => {
    const fetchEnviroment = async () => {
      //Promise, depende de varios fatores externos, ping, e blabla
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );
      //order por ordem ascendente, o json server pode receber esse parms
      setEnviroment([{ key: "all", title: "Todos" }, ...data]);
    };

    fetchEnviroment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>voce quer colocar sua planta ?</Text>
      </View>
      <View>
        <FlatList
          data={enviroment}
          keyExtractor={(item) => String(item.key)}
          //Sempre deve ser uma string
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          //10% para acabar a tela
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
          renderItem={({ item }) => (
            <PlantCartPrimary
              data={item}
              onPress={() => handlePlantSelected(item)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  enviromentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  contentContainerStyle: {},
});
