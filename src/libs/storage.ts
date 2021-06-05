import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { format } from "date-fns";

export interface PlantsProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
  hour: string;
  dateTimeNotification: Date;
}

export interface StoragePlantProps {
  //Chave do objeto vai vim assim, q ele vem pra salver no storage lembra.
  [id: string]: {
    data: PlantsProps;
    notificationId: string;
  };
}

export const savePlantInStorage = async (plant: PlantsProps): Promise<void> => {
  try {
    //Notificacao
    const nextTime = new Date(plant.dateTimeNotification);
    const now = new Date();
    const { times, repeat_every } = plant.frequency;
    if (repeat_every === "week") {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getDate() + interval);
    } else nextTime.setDate(nextTime.getDate() + 1);

    const seconds = Math.abs(
      Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
    );

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Heey, 🌱",
        body: `Esta na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant,
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true,
      },
    });

    const data = await AsyncStorage.getItem("@nlw#5_rn_plantManager:plants");
    //Se tiver ele tras se nao ele traz um obj vazio
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: { data: plant, notificationId },
    };

    //Vai manter oq tem, e adicionar um novo.
    await AsyncStorage.setItem(
      "@nlw#5_rn_plantManager:plants",
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      })
    );
  } catch (error) {
    //Jogar o erro pra frente pra uma outra interface
    throw new Error(error);
  }
};

export const loadPlantsInStorage = async (): Promise<PlantsProps[]> => {
  try {
    const data = await AsyncStorage.getItem("@nlw#5_rn_plantManager:plants");
    //Se tiver ele tras se nao ele traz um obj vazio
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object.keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          hour: format(
            new Date(plants[plant].data.dateTimeNotification),
            "HH:mm"
          ),
        };
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    return plantsSorted;
  } catch (error) {
    //Jogar o erro pra frente pra uma outra interface
    throw new Error(error);
  }
};

export const removePlantsInStorage = async (id: string) => {
  const data = await AsyncStorage.getItem("@nlw#5_rn_plantManager:plants");
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  //cancelar as notificacoes dela
  await Notifications.cancelScheduledNotificationAsync(
    plants[id].notificationId
  );

  delete plants[id];

  await AsyncStorage.setItem(
    "@nlw#5_rn_plantManager:plants",
    JSON.stringify(plants)
  );
};
