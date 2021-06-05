import React, { useEffect } from "react";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import { Routes } from "./src/routes";
import { PlantsProps } from "./src/libs/storage";

export default function App() {
  //doc para utilizar font para o expo
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    //ouvir as notificaoes
    // const subscription = Notifications.addNotificationReceivedListener(
    //   async (notification) => {
    //     const data = notification.request.content.data.plant as PlantsProps;
    //     console.log(data);
    //   }
    // );

    // return () => subscription.remove();

    const notifications = async () => {
      const data = await Notifications.getAllScheduledNotificationsAsync();
      console.log(`##### NOTIFICACOES AGENDADAS #####`);
      console.log(data);
    };

    notifications();
  }, []);

  //Font ja carregou o primeira variavel do vetor é boolean, so colocar o mouse em cima do use fonts,
  //qlq coisa ver a doc.
  //Enquando a font for false, vc vai fazer isso aq
  if (!fontsLoaded) return <AppLoading />;

  return <Routes />;
}
