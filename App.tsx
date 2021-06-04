import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import { Routes } from "./src/routes";

export default function App() {
  //doc para utilizar font para o expo
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });
  //Font ja carregou o primeira variavel do vetor é boolean, so colocar o mouse em cima do use fonts,
  //qlq coisa ver a doc.
  //Enquando a font for false, vc vai fazer isso aq
  if (!fontsLoaded) return <AppLoading />;

  return <Routes />;
}
